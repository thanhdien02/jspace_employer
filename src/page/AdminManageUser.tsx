import React, { useEffect, useRef, useState } from "react";

import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Input, Space, Switch, Table } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import { userGetAll } from "../store/user/user-slice";
import { getToken } from "../utils/auth";
import { DataType } from "../utils/dataFetch";
import { authFetchMe } from "../store/auth/auth-slice";

type DataIndex = keyof DataType;

const AdminManageUser: React.FC = () => {
  const { users } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  // ant design
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "10%",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: "20%",
      ...getColumnSearchProps("username"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "30%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Activated",
      dataIndex: "activated",
      width: "10%",
      render: (even, value) => (
        <Switch
          defaultChecked={value?.activated}
          onChange={(event) => {
            console.log(even);
            console.log(event, value);
          }}
        />
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "20%",
      ...getColumnSearchProps("role"),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      render: (e) => (
        <div className="">
          <Button
            type="primary"
            onClick={() => {
              console.log("hihi", e);
              // handle action
            }}
          >
            Block
          </Button>
        </div>
      ),
    },
  ];

  const { accessToken } = useSelector((state: any) => state.auth);
  //Load information user
  useEffect(() => {
    if (accessToken == "") {
      dispatch(authFetchMe());
      const { accessToken } = getToken();
      dispatch(userGetAll(accessToken));
    } else {
      const { accessToken } = getToken();
      dispatch(userGetAll(accessToken));
    }
  }, []);
  return (
    <Table
      className="m-5 "
      columns={columns}
      dataSource={users}
      onRow={(record, rowIndex) => {
        return {
          onClick: () => {
            console.log(rowIndex, record);
          }, // click row
          onDoubleClick: () => {
            console.log("double");
          }, // double click row
        };
      }}
      rowClassName="hover:text-primary cursor-pointer"
    />
  );
};

export default AdminManageUser;

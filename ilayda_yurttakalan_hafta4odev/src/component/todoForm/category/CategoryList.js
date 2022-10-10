import React from "react";
import { Table, Space, Button } from "antd";

const CategoryList = ({setEditMode, setTempData, categoryData, setCategoryData, todoData, setTodoData }) => {
 
  const handleEditMode = (record) => {
    setEditMode(true)
    setTempData(record)
  }

  const handleDelete = (record) => {
    setTodoData(todoData.filter(todo => {
      return todo?.categoryId !== record.id
    }))
    setCategoryData(categoryData.filter(category => {
      return category.id !== record.id
    }))
  }

  const categoryColumns = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Action",
      key: "id",
      render: (text, record, index) => (
        <Space size="middle">
          <Button onClick={()=> {handleEditMode(record)}}>Edit</Button>
          <Button onClick={()=> {handleDelete(record)}}>Delete</Button>
        </Space>
      ),
    },
  ];
  const statusColumns = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
  ];
  return (
    <Table
      className="category-table"
      columns={categoryColumns}
      dataSource={categoryData}
      pagination={false}
      expandable={{
        expandIconColumnIndex: 0,
        expandedRowRender: (row) => {
          return <Table className="status-table" pagination={false} showHeader={false} columns={statusColumns} dataSource={row?.statusList} />;
        },
      }}
      rowKey="id"
    />
  );
};

export default CategoryList;

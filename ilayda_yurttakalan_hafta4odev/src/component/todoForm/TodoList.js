import React from "react";
import { Col, Row, Table, Select, Button } from "antd";

const TodoList = ({ todoData, setTodoData, categoryData }) => {
  const handleDelete = (record) => {
    setTodoData(
      todoData.filter((todo) => {
        return todo.id !== record.id;
      })
    );
  };
  const todoColumns = [
    {
      key: "name",
      title: "Todo",
      dataIndex: "name",
    },
    {
      key: "categoryId",
      title: "Category",
      dataIndex: "categoryId",
      render: (text, record) => {
        const selectedCategory = categoryData.find((category) => {
          return category.id === record.categoryId;
        });
        return selectedCategory.name;
      },
    },
    {
      key: "statusId",
      title: "Status",
      dataIndex: "statusId",
      render: (text, record) => {
        const selectedCategory = categoryData.find((category) => {
          return category.id === record.categoryId;
        });
        const selectedStatus = selectedCategory?.statusList?.find((status) => {
          return status.id === record.statusId;
        });
        return (
          <Select
            placeholder="Status"
            options={selectedCategory?.statusList?.map((status) => {
              return { label: status?.name, value: status?.id };
            })}
            value={selectedStatus?.id}
            onChange={(value) => {
              const newTodoData = todoData.map((todo) => {
                if (todo.id === record.id) {
                  return { ...todo, statusId: value };
                }
                return todo;
              });
              setTodoData(newTodoData);
            }}
          />
        );
      },
    },
    {
      title: "Action",
      key: "id",
      render: (text, record, index) => (
        <Button
          onClick={() => {
            handleDelete(record);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Row>
      <Col span={12} offset={6}>
        <Table
          className="category-table"
          columns={todoColumns}
          dataSource={todoData}
          pagination={false}
          rowKey="id"
        />
      </Col>
    </Row>
  );
};

export default TodoList;

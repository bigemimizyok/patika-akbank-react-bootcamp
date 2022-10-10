import React, { useState } from "react";
import { Modal, Button, Row } from "antd";
import CategoryList from "./CategoryList";
import CategoryForm from "./CategoryForm";
import { PlusOutlined } from "@ant-design/icons";


const CategoryModal = ({ isModalOpen, setIsModalOpen, categoryData, setCategoryData, todoData, setTodoData }) => {
  const [tempData, setTempData] = useState({});
  const [editMode, setEditMode] = useState(false);

  const handleAdd = ({ data }) => {
    setTempData({})
    setEditMode(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const modalTitle = (
    <Row>
      <h2>Category Settings</h2>
      {!editMode && (
        <Button
          style={{ marginLeft: 20 }}
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          Add
        </Button>
      )}
    </Row>
  );
  return (
    <Modal title={modalTitle} open={isModalOpen} footer={null} onCancel={handleCancel}>
      {editMode ? (
        <CategoryForm
          setEditMode={setEditMode}
          tempData={tempData}
          setTempData={setTempData}
          categoryData={categoryData}
          setCategoryData={setCategoryData}
        />
      ) : (
        <CategoryList
          setEditMode={setEditMode}
          setTempData={setTempData}
          categoryData={categoryData}
          setCategoryData={setCategoryData}
          todoData={todoData}
          setTodoData={setTodoData}
        />
      )}
    </Modal>
  );
};

export default CategoryModal;

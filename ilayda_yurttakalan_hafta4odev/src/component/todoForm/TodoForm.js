import React, { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./TodoList";
import CategoryModal from "./category/CategoryModal";
import { Button, Input, Select, Row, Col } from "antd";

const TodoForm = () => {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [todoData, setTodoData] = useState([])
  const [newTodo, setNewTodo] = useState({});

  const showModal = () => {
    setIsCategoryModalOpen(true);
  };


  const categoryOptions = useMemo(() => {
    return categoryData.map((category) => {
      return { label: category.name, value: category.id };
    });
  }, [categoryData]);

  const addTodo = () => {
    if (newTodo?.name && newTodo.categoryId) {
        const selectedCategory = categoryData.find(category => {
            return category.id === newTodo.categoryId
        })
        let selectedStatus
        if (selectedCategory?.statusList?.length > 0) {
            selectedStatus = selectedCategory.statusList[0].id
        }
        setTodoData([...todoData, {...newTodo, id: uuidv4(), statusId: selectedStatus}])
    }
    setNewTodo({})
  }

  return (
    <div className="todoFormContainer">
      <CategoryModal
        isModalOpen={isCategoryModalOpen}
        setIsModalOpen={setIsCategoryModalOpen}
        categoryData={categoryData}
        setCategoryData={setCategoryData}
        todoData={todoData}
        setTodoData={setTodoData}
      />

      <Row>
        <Col span={12} offset={6}>
          <Input.Group compact>
            <Select
              style={{ width: "20%" }}
              placeholder="Category"
              options={categoryOptions}
              value={newTodo?.categoryId}
              onChange={(value) => {
                setNewTodo({ ...newTodo, categoryId: value });
              }}
            />
            <Input
              style={{ width: "50%" }}
              placeholder="Todo..."
              value={newTodo?.name}
              onChange={(e) => {
                setNewTodo({ ...newTodo, name: e?.target?.value });
              }}
            />
            <Button style={{ width: "15%" }} type="primary" onClick={addTodo}>
              + Add
            </Button>
            <Button style={{ width: "15%" }} onClick={showModal}>
              Category Settings
            </Button>
          </Input.Group>
        </Col>
      </Row>
      <TodoList todoData={todoData} setTodoData={setTodoData} categoryData={categoryData}/>
    </div>
  );
};

export default TodoForm;

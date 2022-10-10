import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Form, Input, Button, Space } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

const CategoryForm = ({
  setEditMode,
  tempData,
  setTempData,
  categoryData,
  setCategoryData,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    console.log(tempData)
    form.setFieldsValue(tempData)
  }, [tempData, form])

  const handleOnFinish = (values) => {
    let isNew = false
    let categoryId = tempData?.id
    if (!categoryId) {
      categoryId = uuidv4()
      isNew = true
    }

    const newStatusList = values?.statusList?.map(status => {
      let statusId = status?.id
      if (!statusId) {
        statusId = uuidv4()
      }
      return {...status, id: statusId}
    })


    if (isNew) {
      setCategoryData([...categoryData, {...values, id: categoryId, statusList: newStatusList}])
    } else {
      const newCategoryData = categoryData.map(category => {
        if (category.id === categoryId) {
          return {...values, id: categoryId, statusList: newStatusList}
        }
        return category
      })
      setCategoryData(newCategoryData)
    }
    setEditMode(false)
  };

  const cancelEditMode = () => {
    setEditMode(false);
  };
  return (
    <div>
      <div>
        <Form form={form} className="modalCategoryEdit" onFinish={handleOnFinish}>
          <Form.Item
            label="Category"
            name="name"
            rules={[{ required: true, message: "Please input your category!" }]}
          >
            <Input
              style={{
                color: "var(--ant-primary-color)",
              }}
              placeholder="New Category"
            />
          </Form.Item>
          <Form.List name="statusList">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "id"]}
                    >
                      <Input placeholder="Name" hidden/>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "name"]}
                      label="Status"
                      rules={[
                        { required: true, message: "Missing status name" },
                      ]}
                    >
                      <Input placeholder="Name" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Button type="primary" onClick={form.submit}>
            Submit
          </Button>
          <Button
            style={{ marginLeft: 20 }}
            type="danger"
            onClick={cancelEditMode}
          >
            Cancel
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CategoryForm;

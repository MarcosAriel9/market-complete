import React, { useEffect, useState } from 'react'
import { Col, Form, Modal, Row, Button } from 'react-bootstrap'
import FeatherIcon from 'feather-icons-react'
import Alert, {
    msjConfirmacion,
    titleConfirmacion,
    titleError,
    msjError,
    titleExito,
    msjExito,
  } from "../../../shared/plugins/alert";
import axios from '../../../shared/plugins/axios';

export default function CategoryFormEdit({isOpen,onClose,id,description,status,setCategories}) {

    const [category, setCategory] = useState({id : id, description : description, status : status})

    const handleSubmit = (event) =>{
        event.preventDefault();
        Alert.fire({
            title: titleConfirmacion,
            text: msjConfirmacion,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            confirmButtonColor : "#198754",
            cancelButtonColor: "#dc3545",
            showCancelButton: true,
            reverseButtons: true,
            showLoaderOnConfirm: true,
            icon: "warning",
            backdrop: true,
            allowOutsideClick: !Alert.isLoading,
            preConfirm: () => {
              return axios({ url: "/category/", method: "PUT" , data : JSON.stringify(category) })
                .then((response) => {
                  console.log(response);
                  if (!response.error) {
                      setCategories(categoties => [
                          category,
                          ...categoties.filter(category => category.id !== id),
                      ])
                    handleCloseForm();
                    Alert.fire({
                      title: titleExito,
                      text: msjExito,
                      icon: "success",
                      confirmButtonColor : "#198754",
                      confirmButtonText: "Aceptar",
                    });
                  }
                  return response;
                })
                .catch((error) => {
                  Alert.fire({
                    title: titleError,
                    text: msjError,
                    icon: "error",
                    confirmButtonText: "Aceptar",
                  });
                });
            },
          });
    };

    const handleChange = (event) =>{
        const {name,value} = event.target;
        setCategory({...category, [name] : value})
    };

    const handleCloseForm = () =>{
        setCategory({});
        onClose();
    };

    useEffect(() => {
      setCategory({
          id:id,
          description : description,
          status : status
      });
    }, [id])
    

  return (
    <Modal show={isOpen} onHide={handleCloseForm}>
    <Modal.Header closeButton>
      <Modal.Title>Modificar Categoría</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-4">
          <Form.Label className="form-label">Nombre</Form.Label>
          <Form.Control
            name="description"
            value={category.description}
            onChange={handleChange}
          />
          {/* { ? (
            <span className="error-text">{}</span>
          ) : null} */}
        </Form.Group>
        <Form.Group className="mb-4">
          <Row>
            <Col className="text-end">
              <Button variant="danger" type="button" onClick={handleCloseForm}>
                <FeatherIcon icon={"x"} />
                &nbsp; Cerrar
              </Button>
              <Button
                variant="success"
                className="ms-3"
                type="submit"
                
              >
                <FeatherIcon icon={"check"} />
                &nbsp; Guardar
              </Button>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </Modal.Body>
  </Modal>
  )
}


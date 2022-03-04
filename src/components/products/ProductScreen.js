import axios from 'axios'
import React from 'react'
import { Row ,Col,Card} from 'react-bootstrap'
import { ButtonCircle } from '../../shared/components/ButtonCircle'
import { DataTableCustom } from '../../shared/components/DataTableCustom'
export const ProductScreen = () => {
    const [isLoading, setisLoading] = useState(false)
   const [products, setproducts] = useState([])
   const getProducts=()=>{
       axios({url:"/product/",method:"get"})
       .then((response)=>{
           console.log(response)
           setisLoading(false)
       }).catch((error)=>{
           console.log(error)
       })
   }
    const columns=[
        {
            name:"#",
            cell:(row,index) => <div>{index +1 }</div>
        }
    ]
  return (
    <Row>
        <Col>
        <Card>
          <Card.Header>
            <Row>
              <Col>Products</Col>
              <Col className="text-end">
               
                <ButtonCircle
                  type={"btn btn-success btn-circle"}
                  onClickFunct={() => {}}
                  icon="plus"
                  size={20}
                />
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
          
          </Card.Body>
        </Card>
        </Col>
    </Row>
  )
}

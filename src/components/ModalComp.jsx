import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Select
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
  const [brands, setBrands] = useState([]);
  const [id, setId] = useState(dataEdit.id || "");
  const [vehicle, setVehicle] = useState(dataEdit.vehicle || "");
  const [brandId, setBrand] = useState(dataEdit.brandId || "");
  const [year, setYear] = useState(dataEdit.year || "");
  const [color, setColor] = useState(dataEdit.color || "");
  const [description, setDescription] = useState(dataEdit.description || "");
  const [wasSold, setWasSold] = useState(dataEdit.wasSold || false);

  // GET with fetch API
  useEffect(() => {
    const fetchBrands = async () => {
      const response = await fetch(
        'http://localhost:8080/v1/brands'
      );
      const data = await response.json();
      setBrands(data);
      if((!brandId || brandId == "") && data.length > 0) {
        setBrand(data[0].id)
      }
    };
    fetchBrands();
  }, []);

  // Post with fetchAPI
  const addVehicle = async () => {
    var method = 'POST';
    var url = 'http://localhost:8080/v1/vehicles'
    if(id) {
      method = 'PUT';
      url = url + '/' + id;
    }
    let response = await fetch(url, {
       method: method,
       body: JSON.stringify({ brandId, vehicle, year, color, description, wasSold }),
       headers: {
          'Content-type': 'application/json; charset=UTF-8',
       },
    });
    let data = await response.json();
    if(data) {
      setData();
    }
    onClose();
 };


  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastro de veículo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" flexDir="column" gap={4}>
              <Box>
                <FormLabel>Veículo</FormLabel>
                <Input
                  type="text"
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Marca</FormLabel>
                <Select onChange={(e) => setBrand(e.target.value)} value={brandId}>
                  {brands.map(({ id, name }, index) => (
                    <option key={index} value={id}>{name}</option>
                  ))}
                </Select>
              </Box>
              <Box>
                <FormLabel>Descrição</FormLabel>
                <Input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Ano</FormLabel>
                <Input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Cor</FormLabel>
                <Input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel htmlFor='sold'>Vendido</FormLabel>
                <Select onChange={(e) => setWasSold(e.target.value)} value={wasSold}>
                    <option key='0' value={true}>Sim</option>
                    <option key='1' value={false}>Não</option>
                </Select>
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="start">
            <Button colorScheme="green" mr={3} onClick={addVehicle}>
              SALVAR
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              CANCELAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComp;
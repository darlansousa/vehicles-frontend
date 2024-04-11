import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalComp from "./components/ModalComp";

const App = () => {
  const [vehicles, setVehicles] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dataEdit, setDataEdit] = useState({});

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  // GET with fetch API
  const fetchVehicles = async () => {
    const response = await fetch(
      'http://localhost:8080/v1/vehicles'
    );
    const data = await response.json();
    setVehicles(data);
  };
  useEffect(() => {
    fetchVehicles();
  }, []);

  // Delete with fetchAPI
  const deleteVehicle = async (id) => {
    let response = await fetch(
      `http://localhost:8080/v1/vehicles/${id}`,
      {
        method: 'DELETE',
      }
    );
    if (response.status === 200) {
      setVehicles(
        vehicles.filter((it) => {
          return it.id !== id;
        })
      );
    } else {
      return;
    }
  };

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="20px"
      fontFamily="poppins"
    >
      <Box maxW={800} w="100%" h="100vh" py={10} px={2}>
        <Button colorScheme="blue" onClick={() => [setDataEdit({}), onOpen()]}>
          NOVO
        </Button>

        <Box overflowY="auto" height="100%">
          <Table mt="6">
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize="15px">
                  #
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="15px">
                  Veículo
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="15px">
                  Descrição
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="15px">
                  Ano
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {vehicles.map(({ id, vehicle, brand, year, color, description, wasSold }, index) => (
                <Tr key={index} cursor="pointer " _hover={{ bg: "gray.100" }}>
                  <Td maxW={isMobile ? 5 : 100}>{id}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{vehicle}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{description}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{year}</Td>
                  <Td p={0}>
                    <EditIcon
                      fontSize={20}
                      onClick={() => [
                        setDataEdit({
                          id : id,
                          vehicle: vehicle, 
                          brandId: brand.id, 
                          year : year, 
                          color : color, 
                          description : description, 
                          wasSold: wasSold
                        }),
                        onOpen(),
                      ]}
                    />
                  </Td>
                  <Td p={0}>
                    <DeleteIcon
                      fontSize={20}
                      onClick={() => deleteVehicle(id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {isOpen && (
        <ModalComp
          isOpen={isOpen}
          onClose={onClose}
          data={vehicles}
          setData={fetchVehicles}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
        />
      )}
    </Flex>
  );
};

export default App;
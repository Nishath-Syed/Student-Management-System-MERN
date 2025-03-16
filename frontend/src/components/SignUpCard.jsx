'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  useToast,
  IconButton,
  Icon
} from '@chakra-ui/react'
import { useState } from 'react'
import { MdHome } from 'react-icons/md'  
import { useSetRecoilState } from 'recoil'
import authScreenAtom from '../atoms/authAtom'
import userAtom from '../atoms/userAtom'
import { useNavigate } from 'react-router-dom'

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false)
  const setAuthScreen = useSetRecoilState(authScreenAtom)
  const setUser = useSetRecoilState(userAtom)
  const showToast = useToast()

  const [inputs, setInputs] = useState({
    rollno: "",
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    motherName: '',
    motherPhone: '',
    fatherName: '',
    fatherPhone: '',
    gradeLevel: '',
    profilePic: ""
  })

  const toast = useToast()
  const navigate = useNavigate()

  const handleSignup = async () => {
    try {
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      })

      const data = await res.json()

      if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        })
        return
      }

      toast({
        title: "Signed Up Successfully",
        description: "You have successfully registered a new student.",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
      setUser(data)
      navigate('/')
      setInputs({
        rollno: "",
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        email: "",
        phone: "",
        address: "",
        motherName: '',
        motherPhone: '',
        fatherName: '',
        fatherPhone: '',
        gradeLevel: '',
        profilePic: ""
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }))
  }

  return (
    <Flex
      align={"center"}
      justify={"center"}
      minHeight="100vh"
      bg="transparent"  
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"} position="relative">
          <Box
            position="absolute"
            top="20px"
            right="20px"
            bg="purple.50"
            p={2}
            borderRadius="md"
            boxShadow="lg"
            _hover={{ bg: "purple.100", cursor: "pointer" }}
            onClick={() => navigate('/')}
          >
            <Icon as={MdHome} boxSize={6} color="purple.600" />
          </Box>
          <Heading fontSize={"4xl"} textAlign={"center"} color="black">
            Register a Student
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg="purple.50"  
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Box>
              <FormControl isRequired>
                <FormLabel color="purple.600">Roll Number</FormLabel>
                <Input
                  type="text"
                  name="rollno"
                  onChange={handleChange}
                  value={inputs.rollno}
                  borderColor="purple.500"
                  _focus={{
                    borderColor: "purple.700",
                  }}
                />
              </FormControl>
            </Box>
            <HStack>
              <Box>
                <FormControl isRequired>
                  <FormLabel color="purple.600">First Name</FormLabel>
                  <Input
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    value={inputs.firstName}
                    borderColor="purple.500"
                    _focus={{
                      borderColor: "purple.700",
                    }}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                  <FormLabel color="purple.600">Last Name</FormLabel>
                  <Input
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    value={inputs.lastName}
                    borderColor="purple.500"
                    _focus={{
                      borderColor: "purple.700",
                    }}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl isRequired>
              <FormLabel color="purple.600">Date of Birth</FormLabel>
              <Input
                type="date"
                name="dob"
                onChange={handleChange}
                value={inputs.dob}
                borderColor="purple.500"
                _focus={{
                  borderColor: "purple.700",
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="purple.600">Gender</FormLabel>
              <Input
                type="text"
                name="gender"
                onChange={handleChange}
                value={inputs.gender}
                borderColor="purple.500"
                _focus={{
                  borderColor: "purple.700",
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="purple.600">Email Address</FormLabel>
              <Input
                type="email"
                name="email"
                onChange={handleChange}
                value={inputs.email}
                borderColor="purple.500"
                _focus={{
                  borderColor: "purple.700",
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="purple.600">Phone Number</FormLabel>
              <Input
                type="text"
                name="phone"
                onChange={handleChange}
                value={inputs.phone}
                borderColor="purple.500"
                _focus={{
                  borderColor: "purple.700",
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel color="purple.600">Address</FormLabel>
              <Input
                type="text"
                name="address"
                onChange={handleChange}
                value={inputs.address}
                borderColor="purple.500"
                _focus={{
                  borderColor: "purple.700",
                }}
              />
            </FormControl>
            <HStack>
              <Box>
                <FormControl isRequired>
                  <FormLabel color="purple.600">Mother Name</FormLabel>
                  <Input
                    type="text"
                    name="motherName"
                    onChange={handleChange}
                    value={inputs.motherName}
                    borderColor="purple.500"
                    _focus={{
                      borderColor: "purple.700",
                    }}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                  <FormLabel color="purple.600">Mother Phone</FormLabel>
                  <Input
                    type="text"
                    name="motherPhone"
                    onChange={handleChange}
                    value={inputs.motherPhone}
                    borderColor="purple.500"
                    _focus={{
                      borderColor: "purple.700",
                    }}
                  />
                </FormControl>
              </Box>
            </HStack>
            <HStack>
              <Box>
                <FormControl isRequired>
                  <FormLabel color="purple.600">Father Name</FormLabel>
                  <Input
                    type="text"
                    name="fatherName"
                    onChange={handleChange}
                    value={inputs.fatherName}
                    borderColor="purple.500"
                    _focus={{
                      borderColor: "purple.700",
                    }}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                  <FormLabel color="purple.600">Father Phone</FormLabel>
                  <Input
                    type="text"
                    name="fatherPhone"
                    onChange={handleChange}
                    value={inputs.fatherPhone}
                    borderColor="purple.500"
                    _focus={{
                      borderColor: "purple.700",
                    }}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl isRequired>
              <FormLabel color="purple.600">Grade Level</FormLabel>
              <Input
                type="text"
                name="gradeLevel"
                onChange={handleChange}
                value={inputs.gradeLevel}
                borderColor="purple.500"
                _focus={{
                  borderColor: "purple.700",
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="purple.600">Profile Picture URL</FormLabel>
              <Input
                type="text"
                name="profilePic"
                onChange={handleChange}
                value={inputs.profilePic}
                borderColor="purple.500"
                _focus={{
                  borderColor: "purple.700",
                }}
              />
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg="purple.600"
                color="white"
                _hover={{
                  bg: "purple.700",
                }}
                onClick={handleSignup}
              >
                Sign up
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
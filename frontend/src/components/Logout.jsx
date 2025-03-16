import { Button, useToast, Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import { HiOutlineLogout } from 'react-icons/hi';
import { useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const setUser = useSetRecoilState(userAtom);
  const showToast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogOut = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.error) {
        showToast({
          title: "Error",
          description: data.error,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
          variant: "solid",
          bgColor: "red.500",
          color: "white",
        });
      } else {
        localStorage.removeItem('mstproject');
        setUser(null);
        showToast({
          title: "Logged Out",
          description: "You have successfully logged out.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
          variant: "solid",
          bgColor: "green.500",
          color: "white",
        });
        navigate('/');
      }
    } catch (err) {
      showToast({
        title: "Error",
        description: err.message || "An unexpected error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
        variant: "solid",
        bgColor: "red.500",
        color: "white",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box position="absolute" top="20px" right="20px">
      <Button
        onClick={handleLogOut}
        colorScheme="purple"
        variant="outline"
        borderRadius="md"
        leftIcon={<HiOutlineLogout size={20} />}
        isLoading={loading}
        loadingText="Logging out..."
        _hover={{
          bg: 'purple.200',
          color: 'white', 
        }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Logout;

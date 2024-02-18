import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import AuthDrawer from "./AuthDrawer";

const Links = ["Dashboard"];

const NavLink = (props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        color: useColorModeValue("#61dafb"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAuthDrawerOpen, setIsAuthDrawerOpen] = useState(false);
  const [authType, setAuthType] = useState(0);

  const { isLogin } = useAuth();
  return (
    <>
      <Box borderBottom="1px solid #61dafb" width="100vw" px={4} >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>Logo</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            {isLogin ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                    }
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem>Link 1</MenuItem>
                  <MenuItem>Link 2</MenuItem>
                  <MenuDivider />
                  <MenuItem>Link 3</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Box display="flex" flexDirection="row" gap="5px">
                <Box
                  cursor="pointer"
                  onClick={() => {
                    setIsAuthDrawerOpen(true);
                    setAuthType(0);
                  }}
                >
                  Login{" "}
                </Box>
                |{" "}
                <Box
                  cursor="pointer"
                  onClick={() => {
                    setIsAuthDrawerOpen(true);
                    setAuthType(1);
                  }}
                >
                  Register
                </Box>
              </Box>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
        <AuthDrawer
          isOpen={isAuthDrawerOpen}
          onClose={() => setIsAuthDrawerOpen(false)}
          authType={authType}
        />
      </Box>
    </>
  );
}

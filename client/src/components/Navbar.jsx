import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  ArrowDropDownOutlined,
  AccountCircleTwoTone,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import FlexBetween from "components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "redux/slices/theme";
import profileImage from "assets/profile.jpeg";
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
  Modal,
  Avatar,
} from "@mui/material";
import { logout } from "redux/slices/user";
import { useNavigate } from "react-router-dom";
import AddProduct from "scenes/products/AddProduct";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [addEl, setAddEl] = useState(null);
  const isAddElOpen = Boolean(addEl);
  const handleAddElClick = (event) => setAddEl(event.currentTarget);
  const handleAddElClose = () => setAddEl(null);

  // Add Product Modal
  const [showProductModal, setShowProductModal] = useState(false);
  const handleOpenProductModal = () => {
    handleAddElClose();
    setShowProductModal(true);
  };
  const handleCloseProductModal = () => {
    handleAddElClose();
    setShowProductModal(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>

          {/* Add */}
          <FlexBetween>
            <IconButton onClick={handleAddElClick}>
              <AddIcon sx={{ fontSize: "25px" }} />
            </IconButton>
            <Menu
              anchorEl={addEl}
              open={isAddElOpen}
              onClose={handleAddElClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleOpenProductModal}>Add Product</MenuItem>
              <MenuItem onClick={() => navigate("/register")}>
                Add Employee
              </MenuItem>
            </Menu>
          </FlexBetween>

          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Avatar sx={{ bgcolor: theme.palette.secondary[400] }}>
                {user &&
                  user.name
                    ?.split(" ")
                    ?.reduce((prev, curr) => prev + curr[0]?.toUpperCase(), "")}
              </Avatar>
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user?.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user?.email}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
      <AddProductModal
        open={showProductModal}
        handleClose={handleCloseProductModal}
      />
    </AppBar>
  );
};

export default Navbar;

const AddProductModal = ({ open, handleClose }) => {
  const theme = useTheme();
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="Add new product"
      aria-describedby="Add new product description"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          backgroundImage: "none",
          backgroundColor: theme.palette.background.alt,
          borderRadius: "0.55rem",
          overflow: "auto",
          width: "fit",
          margin: "auto",
        }}
      >
        <AddProduct />
      </Box>
    </Modal>
  );
};

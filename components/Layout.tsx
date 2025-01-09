import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";
import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, styled, Toolbar, Typography, useTheme, } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useRouter } from "next/router";

const drawerWidth = 180;

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const theme = useTheme();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const router = useRouter();

    const menuItems = [
        { text: "หน้าแรก", path: "/", icon: <HomeIcon /> },
        { text: "รายการสินค้า", path: "/manage-products", icon: <EditIcon /> },
        { text: "ตั้งค่า", path: "/settings", icon: <SettingsIcon /> },
    ];

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: "#fff",
                    zIndex: theme.zIndex.drawer + 1,
                }}
            >
                <Toolbar>
                    <Box
                        component="img"
                        src="/logo_designed_by_Pngtree.png"
                        alt="Logo"
                        sx={{ height: 40, width: 40, mr: 1 }}
                    />

                    <Typography
                        component="div"
                        sx={{
                            flexGrow: 1,
                            background:
                                "linear-gradient(180deg,rgb(105, 51, 255),rgb(255, 0, 106))",
                            fontWeight: "bold",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        My App
                    </Typography>

                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="default"
                    >
                        <AccountCircle />
                        <Typography
                            sx={{
                                ml: 1,
                                fontSize: "0.875rem",
                                fontWeight: "bold",
                            }}
                        >
                            My Account
                        </Typography>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        display: "flex",
                        justifyContent: "center", // จัดแนวนอน
                        alignItems: "center", // จัดแนวตั้ง
                    },
                }}
            >
                <DrawerHeader />
                <Divider />
                <List style={{ width: drawerWidth }}>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton
                                selected={router.pathname === item.path}
                                onClick={() => router.push(item.path)}
                                sx={{
                                    "&.Mui-selected": {
                                        backgroundColor: "rgba(112, 44, 175, 0.45)",
                                        color: "white",
                                        "&:hover": {
                                            backgroundColor: "rgba(112, 44, 175, 0.45)",
                                            color: "white",
                                        },
                                    },
                                    "&:hover": {
                                        backgroundColor: "rgba(190, 0, 89, 0.24)",
                                        color: "black",
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: "inherit" }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
};

export default Layout;

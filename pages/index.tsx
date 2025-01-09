import Layout from "@/components/Layout";
import React, { useState, useEffect } from "react";
import { Box, TextField, Grid, Typography, Button, Card, CardContent, } from "@mui/material";
import { fetchCarts, Product } from "@/services/cartService";
import { ProductCard } from "@/components/ProductCard";
import IndexSkeleton from "@/components/IndexSkeleton";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // ดึงข้อมูลสินค้า
  useEffect(() => {
    setLoading(true);
    fetchCarts()
      .then((res) => {
        setProducts(res); // เก็บสินค้าใน products
        setFilteredProducts(res); // ตั้งค่าข้อมูลเริ่มต้นให้ filteredProducts
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  // อัปเดตสินค้าเมื่อคำค้นเปลี่ยน
  useEffect(() => {
    const filtered = products?.filter((product) =>
      product.title?.toLowerCase().includes(productName.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [productName, products]);

  const handleAddToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleClear = () => {
    setCart([]);
  };

  return (
    <Layout>
      {loading ? <IndexSkeleton /> : 
      <Box display="flex" height="85vh">
        {/* ฝั่งซ้าย */}
        
        <Box
          flex="2"
          p={2}
          sx={{
            borderRight: "1px solid #ccc",
          }}
        >
          <Box
            p={1}
            sx={{
              height: "10%",
            }}
          >
            <TextField
              label="Search Products"
              fullWidth
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Box>
          <Box
            p={1}
            sx={{
              overflowY: "auto",
              height: "90%",
            }}
          >
            <Grid container spacing={2} mt={2}>
              {filteredProducts?.length > 0 ? (
                filteredProducts.map((product) => (
                  <Grid item xs={12} sm={12} md={12} key={product.id}>
                    <ProductCard
                      productList={[product]}
                      onAddToCart={() => handleAddToCart(product)}
                    />
                  </Grid>
                ))
              ) : (
                <Typography>No products found</Typography> // แสดงข้อความเมื่อไม่มีสินค้า
              )}
            </Grid>
          </Box>
        </Box>

        {/* ฝั่งขวา */}
        <Box flex="1" p={1}>
          <Box
            p={1}
            sx={{
              overflowY: "auto",
              height: "90%",
            }}
          >
            <Typography variant="h6">Cart</Typography>
            {cart.map((item) => (
              <Card key={item.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2">Price: {item.price}</Typography>
                  <Typography variant="body2">
                    Quantity: {item.quantity}
                  </Typography>
                  <Button
                    onClick={() => handleRemoveFromCart(item.id)}
                    variant="contained"
                    color="secondary"
                  >
                    Remove
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Box
            sx={{
              height: "10%",
            }}
            p={1}
          >
            <Box mt={2}>
              <Typography>Total: {calculateTotal()}</Typography>
              <Button onClick={handleClear} variant="contained" color="error">
                Clear
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      }
    </Layout>
  );
}

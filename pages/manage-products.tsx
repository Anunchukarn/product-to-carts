import React, { useState, useEffect } from "react";
import { Box, TextField, Grid, Typography, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { fetchCarts, Product } from "@/services/cartService";
import { ProductCard } from "@/components/ProductCard";
import Layout from "@/components/Layout";
import ManageProductsSkeleton from "@/components/ManageSkeleton";

export default function ManageProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    title: "",
    price: 0,
    thumbnail: "",
    category: "",
  });
  const [productName, setProductName] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // สำหรับเก็บไฟล์รูปภาพที่เลือก
  const [loading, setLoading] = useState(true);

  // ดึงข้อมูลสินค้า
  useEffect(() => {
    setLoading(true);
    fetchCarts()
      .then((res) => {
        setProducts(res); // เก็บสินค้าใน products
        setFilteredProducts(res); // ตั้งค่า filteredProducts ด้วยสินค้าเริ่มต้น
        const uniqueCategories = Array.from(
          new Set(res.map((product: Product) => product.category))
        ) as string[];
        setCategories(uniqueCategories);
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

  // เพิ่มสินค้าใหม่
  const handleAddProduct = () => {
    const updatedProducts = [
      ...products,
      { ...newProduct, id: products.length + 1 },
    ];
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    setNewProduct({
      id: 0,
      title: "",
      price: 0,
      thumbnail: "",
      category: "",
    });
    setSelectedImage(null); // รีเซ็ตไฟล์ที่เลือก
  };

  // ลบสินค้า
  const handleRemoveProduct = (id: number) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
  };

  // อัปเดต thumbnail เมื่อเลือกไฟล์
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setNewProduct({
        ...newProduct,
        thumbnail: URL.createObjectURL(file), // สร้าง URL สำหรับแสดงตัวอย่าง
      });
    }
  };

  return (
    <Layout>
      {loading ? <ManageProductsSkeleton /> : 
      <Box display="flex" height="85vh">
        {/* ซ้าย: รายการสินค้า */}
        <Box
          flex="2"
          p={2}
          sx={{
            borderRight: "1px solid #ccc",
          }}
        >
          <Box p={1} sx={{ height: "10%" }}>
            <TextField
              label="Search Products"
              type="text"
              fullWidth
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Box>
          <Box p={1} sx={{ overflowY: "auto", height: "90%" }}>
            <Grid container spacing={2} mt={2}>
              {filteredProducts?.length > 0 ? (
                filteredProducts.map((product) => (
                  <Grid item xs={12} sm={12} md={12} key={product.id}>
                    <ProductCard
                      productList={[product]}
                      onRemoveProduct={() => handleRemoveProduct(product.id)}
                    />
                  </Grid>
                ))
              ) : (
                <Typography>No products found</Typography>
              )}
            </Grid>
          </Box>
        </Box>

        {/* ขวา: แบบฟอร์มเพิ่มสินค้า */}
        <Box
          flex="1"
          p={2}
          sx={{
            overflowY: "auto",
            height: "100%",
          }}
        >
          <Typography variant="h6">Add New Product</Typography>
          <Button variant="outlined" component="label" sx={{ mt: 2 }}>
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
          {selectedImage && (
            <Box mt={2}>
              <Typography>Selected Image:</Typography>
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Preview"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            </Box>
          )}
          <TextField
            label="Title"
            fullWidth
            value={newProduct.title}
            onChange={(e) =>
              setNewProduct({ ...newProduct, title: e.target.value })
            }
            sx={{ mt: 2 }}
          />
          <TextField
            label="Price"
            type="number"
            fullWidth
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: Number(e.target.value) })
            }
            sx={{ mt: 2 }}
          />
          {/* ฟอร์มสำหรับเลือกไฟล์รูปภาพ */}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            onClick={handleAddProduct}
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Add Product
          </Button>
        </Box>
      </Box>
}
    </Layout>
  );
}

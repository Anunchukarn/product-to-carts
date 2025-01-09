import { Box, Typography, IconButton, Grid, CardMedia, Button, Card, CardContent } from "@mui/material";
import { Product } from "@/services/cartService";

interface ProductCardProps {
    productList: Product[]; // Array ของสินค้า
    onAddToCart?: (product: Product) => void;
    onRemoveProduct?: (product: Product) => void;
}

export function ProductCard(props: ProductCardProps) {
    const { productList, onAddToCart, onRemoveProduct } = props;

    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {productList?.map((product, index) => (
                <Grid item xs={12} sm={12} md={12} key={index}>
                    <Card sx={{ display: 'flex' }}>
                        <CardMedia
                            component="img"
                            src={product.thumbnail || "https://via.placeholder.com/150"}
                            alt={product.title}
                            sx={{ width: 151 }}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography variant="h6" sx={{ mb: 1 }}>
                                    {product.title}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    Price: ${product.price}
                                </Typography>
                                <Box sx={{ mt: 1 }}>
                                    {onRemoveProduct ? (
                                        <Button
                                            onClick={() => onRemoveProduct(product)}
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            sx={{ textTransform: "capitalize" }}
                                        >
                                            Remove
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={() => onAddToCart && onAddToCart(product)}
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            sx={{ textTransform: "capitalize" }}
                                        >
                                            Add to Cart
                                        </Button>
                                    )}
                                </Box>
                            </CardContent>


                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

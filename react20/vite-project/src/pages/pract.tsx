
type ProductDrop = {
    title: string;
    price: number;
    inStock: boolean;
}

type ProductEntry = {
    id: number;
    title: string;
    price: number;
    inStock: boolean;
}

type ProductListProps = {
    products: ProductEntry[];
}

function ProductDrop(props: ProductDrop) {
    return (
        <article>
            <h3>Товар "{props.title}"</h3>
            <p> {props.price.toLocaleString('ru')} руб.</p>
            <p>{props.inStock ? 'В наличии' : 'Нет в наличии'}</p>
        </article>
    );
}

const products: ProductEntry[] = [
    {id: 1, title: "Мяч", price: 1000, inStock: true},
    {id: 2, title: "Ноутбук", price: 10000, inStock: false},
    {id: 3, title: "Книга", price: 500, inStock: true}   
]

function ProductList(props: ProductListProps) {

    return (
        <section style={{display: "flex", gap: "20px", boxShadow: "0 0 10px #ccc", padding: "20px"}}>
            <h2>Список товаров</h2>
            {props.products.slice(0, 3).map(
                product => (<ProductDrop key={product.id} {...product} />
            ))}
        </section>
    )
}

export default function ExamplePage() {
  return (
    <>
        <ProductList products={products} />
        
    </>
  );
}


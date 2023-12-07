import { memo } from "react";


function ProductInfo({ renderItem }) {
    return (
        <>
            {renderItem}
        </>
    )
}

export default memo(ProductInfo);
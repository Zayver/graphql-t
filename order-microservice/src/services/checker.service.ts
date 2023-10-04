export const checkUserId = async (id: string) => {
    const endpoint = process.env.USER_URL
    const query = `query User {
        user(id: "${id}") {
            id
            email
            name
            secondName
            surName
            secondSurname
            dir
        }
    }
    `;

    const res = await fetch(endpoint!, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ query })
    })
    const json = await res.json()

    if (json.data.user === null) {
        throw new Error("No user exists")
    }
}

export const checkProducts = async (productsId: string[]) => {
    const endpoint = process.env.PRODUCT_URL
    productsId.forEach( async (v, _, _1) => {

        const query = `query Product {
            product(id: "${v}") {
                id
            }   
        }
        `;

        const res = await fetch(endpoint!, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ query })
        })
        const json = await res.json()

        if (json.data.product === null) {
            throw new Error("No product exists")
        }
    })
}
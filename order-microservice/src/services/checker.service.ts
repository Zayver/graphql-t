const madeRequest = async (id: string) => {
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
}


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

    const res = await fetch(endpoint!,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query })
    })

    console.log(res)
}
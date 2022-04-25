export default function sendTransaction(data) {
    return new Promise(async resolve => {
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + process.env.REACT_APP_POST, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            })
            if (response.ok) {
                resolve({
                    status: true,
                    message: ("Success: " + response.status),
                });
            } else {
                console.log("Ошибка HTTP: " + response.status);
                resolve(setTimeout(() => sendTransaction(data), 3000));
            }
        } catch (e) {
            console.log("Ошибка HTTP: " + e);
            resolve(setTimeout(() => sendTransaction(data), 3000));
        }
    })

}
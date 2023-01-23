import * as postmark from 'postmark';

const client = new postmark.ServerClient("b66c910c-ecd6-4407-b8d2-d88746e55583");

export const sendConfirmationEmail = (email: string, name: string, token: string) => {
    client.sendEmailWithTemplate({
        "TemplateModel": {
            "product_name": "my nestjs-training app",
            "name": name,
            "action_url": `${process.env.BASE_URL}/auth/${token}`
        },
        "TemplateId": 30511376,
        "From": "ekaterina.hubkina@pargoo.com",
        "To": email,
    })
        .then(response => {
            console.log("Sending message");
            console.log(response.To);
            console.log(response.Message);
        })
        .catch(err => console.log(err))
}
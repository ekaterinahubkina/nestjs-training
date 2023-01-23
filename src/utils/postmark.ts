import * as postmark from 'postmark';

const client = new postmark.ServerClient(process.env.POSTMARK_TOKEN);

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
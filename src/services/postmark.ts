import * as postmark from 'postmark';
import * as dotenv from 'dotenv';
import { HttpException, HttpStatus } from '@nestjs/common';

dotenv.config();

const client = new postmark.ServerClient(process.env.POSTMARK_TOKEN.toString());

export const sendConfirmationEmail = async (email: string, name: string, token: string) => {
    try {
        const response = await client.sendEmailWithTemplate({
            "TemplateModel": {
                "product_name": "my nestjs-training app",
                "name": name,
                "action_url": `${process.env.BASE_URL}/auth/confirmation?token=${token}`
            },
            "TemplateId": 30511376,
            "From": "ekaterina.hubkina@pargoo.com",
            "To": email,
        });
        console.log("Sending message");
        console.log(response.To);
        console.log(response.Message);
    } catch (err) {
        console.log(err)
        throw new HttpException('An errror occured', HttpStatus.UNPROCESSABLE_ENTITY);
    }
}
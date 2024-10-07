// import express, { Request, Response, Application } from 'express';
// import cors from "cors"

// const app = express();
// const port = process.env.PORT || 3000;
// import bodyParser from 'body-parser'

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.use(cors())

// app.get("/api/user", (_req: Request, res: Response) => {
//     const user = {
//         name: "Ali",
//         id: 55
//     }
//     return res.status(200).json({user})
// })

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
//   });
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import { swaggerSpec } from './swagger';
// Routes
import formRoutes from './routes/express/form'
import leadRoutes from './routes/express/lead'
import partnerRoutes from './routes/express/partner'
import treatmentRoutes from './routes/express/treatment'
import authRoutes from './routes/express/auth'
import dashboardRoutes from './routes/express/dashboard'
import adminRoutes from './routes/express/admin'
import inviteTokenRoutes from './routes/express/invite-token'
import walletRoutes from './routes/express/wallet'
import transactionRoutes from './routes/express/transaction'
import operatorRoutes from './routes/express/operator'
import operatorWalletRoutes from './routes/express/operator-wallet'
import affiliateRoutes from './routes/express/affiliate'
import affiliateTransactionRoutes from './routes/express/affiliate-transaction'
import affiliateWalletRoutes from './routes/express/affiliate-wallet'

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get('/', (req, res) => res.send('API UP!'))
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(formRoutes)
app.use(leadRoutes)
app.use(partnerRoutes)
app.use(treatmentRoutes)
app.use(authRoutes)
app.use(dashboardRoutes)
app.use(adminRoutes)
app.use(inviteTokenRoutes)
app.use(walletRoutes)
app.use(transactionRoutes)
app.use(operatorRoutes)
app.use(operatorWalletRoutes)
app.use(affiliateRoutes)
app.use(affiliateTransactionRoutes)
app.use(affiliateWalletRoutes)

export { app }
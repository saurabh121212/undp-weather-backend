const dotenv = require('dotenv')
dotenv.config()

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


const events = require('events');
const eventEmitter = new events.EventEmitter();


global._config = require('./config/config.js');
console.log('Environment:', _config.app);


app.get('/', (req, res) => {
    res.send('Hello World!');
});


const AdminRouter = require('./routers/admin.js');
const WeatherCategoriesRouter = require('./routers/weather-categories.js');
const WeatherAlertTypeRouter = require('./routers/weather-alert-type.js');
const WeatherLocationsRouter = require('./routers/weather-locations.js');
const UploadFilesRouter = require('./routers/upload-files.js');
const FaqsRouter = require('./routers/faqs.js');
const RiskAndResponseRouter = require('./routers/risk-and-response.js');
const SeasonalForecastRouter = require('./routers/seasonal-forecast.js');
const WeatherAlartsRouter = require('./routers/weather-alarts.js');
const FeedbackRouter = require('./routers/feedback.js');
const ReportIncidentRouter = require('./routers/report-incident.js');
const WeatherDataRequestsRouter = require('./routers/weather-data-requests.js');
const UserRouter = require('./routers/user.js');
const WeatherDetailsRouter = require('./routers/weather-details.js');


app.use('/api/admin', AdminRouter);
app.use('/api/weather-categories', WeatherCategoriesRouter);
app.use('/api/weather-alert-type', WeatherAlertTypeRouter);
app.use('/api/weather-locations', WeatherLocationsRouter);
app.use('/api/upload', UploadFilesRouter);
app.use('/api/faqs', FaqsRouter);
app.use('/api/risk-and-response', RiskAndResponseRouter);
app.use('/api/seasonal-forecast', SeasonalForecastRouter);
app.use('/api/weather-alarts', WeatherAlartsRouter);
app.use('/api/feedback', FeedbackRouter);
app.use('/api/report-incident', ReportIncidentRouter);
app.use('/api/weather-data-requests', WeatherDataRequestsRouter);
app.use('/api/user', UserRouter);
app.use('/api/weather-details', WeatherDetailsRouter);

const db = require('./db/database.js')(eventEmitter);
eventEmitter.once('db-connection-established', () => {
    console.log('Database connection established.')
});

module.exports= app;

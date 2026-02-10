export const logger = (req, res, next) => {

    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;

    console.log(`[${timestamp}] ${method} ${url}`);

    //log query params if present
    if(Object.keys(req.query).length > 0){
        console.log('Query params: ', req.query);
    }

    //Log body if present (for POST/PUT )
    if(req.body && Object.keys(req.body).length > 0){
        console.log('Body:', req.body);
    }

    next();

}
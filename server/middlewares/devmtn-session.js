const sessions = {};
let nextSessionsId=1;

module.exports= (req,res,next)=>{
        function createSession(){
            const newSession = {};
            sessions[nextSessionsId] = newSession;
            req.session=newSession;
            res.setHeader('set-cookie', 'cookieId='+ nextSessionsId +';path=/;');
            nextSessionsId++;
        }
        if (req.headers.cookie){
            const sessionId = req.headers.cookie.split('=')[1];
            if(sessions[sessionId]){
                req.session = sessions[sessionId];
            } else{
                // create new session 
                createSession();
            }
        } else {
            createSession();
        }
        next();
    }

# Back-End
MEDICINAL CABINET BACKEND ENDPOINTS

BASE URL: https://med-cab-backend.herokuapp.com


ENDPOINT	
    /api/user/register

METHOD	
	POST	

REQUIRED	
    {username: required,
    password: required}

RETURNS
	{id, username, hashed password}

/////////////////////////////////////////////
ENDPOINT
    /api/user/login

METHOD
    POST

REQUIRED
	{username: required,
    password: required}

RETURNS
	{welcome message, token}
///////////////////////////////////////////////

		
		
ENDPOINT
    /api/user/logout

METHOD
    GET

REQUIRED
    *logged in session*	

RETURNS
    {logout message}

/////////////////////////////////////////////

ENDPOINT
    /api/strain/:strain

METHOD
    GET

REQUIRED
    Strain name

RETURNS
    	{description: , effects: , flavors: , name: , rating: , type: }



DS HEROKU APP(strainDB) https://med-cabinet-1.herokuapp.com/strain

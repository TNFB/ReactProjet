Start-Process powershell -ArgumentList "-NoExit","-Command","cd '.\api'; nodemon"
Start-Process powershell -ArgumentList "-NoExit","-Command","cd '.\backend'; nodemon"
Start-Process powershell -ArgumentList "-NoExit","-Command","cd '.\lmf'; npm start"
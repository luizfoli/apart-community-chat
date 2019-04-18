const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/dist/apart-community-chat'));
app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/apart-community-chat/index.html'));
});

app.listen(process.env.PORT || 8080, () => {
    console.log('ApartCommunityChat runing!')
});
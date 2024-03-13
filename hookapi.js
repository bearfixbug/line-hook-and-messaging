app.post("/api/g2b/linehook", (req, res) => {
  try {
    console.log("req 1", req.body)
    console.log("req 2", req.body.events[0].message) // message text
    console.log("req 3", req.body.events[0].deliveryContext)
    console.log("req 4", req.body.events[0].source) // source id
    const msg = req.body.events[0].message.text;
    const userId = req.body.events[0].source.userId; // userid U123123
    const groupId = req.body.events[0].source.groupId; // groupid G123123
  
    function sendlinemsg(msg) {
      let data = JSON.stringify({
        "to": userId,
        "messages": [
          {
            "type": "text",
            "text": msg
          }
        ]
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.line.me/v2/bot/message/push',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer <bearer>'
        },
        data : data
      };

      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
    }

    function sendlineflex() {
      var items = [];
      var sum = 230;
      
      items.push({
        "type": "text",
        "text": "ค่าอินเทอร์เน็ต",
        "size": "sm",
        "color": "#555555",
        "flex": 0
      })
      items.push({
        "type": "text",
        "text": (sum).toFixed(2) + " บาท",
        "size": "sm",
        "color": "#111111",
        "align": "end"
      })
      
      
      let data = JSON.stringify({
        "to": userId,
        "messages": [
          {
            "type": "flex",
            "altText": "from postman",
            "contents": {
              "type": "bubble",
              "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": "ค่าอินเทอร์เน็ต",
                    "weight": "bold",
                    "color": "#1DB446",
                    "size": "sm"
                  },
                  {
                    "type": "text",
                    "text": "สรุปบิลเดือน มีค",
                    "weight": "bold",
                    "size": "xxl",
                    "margin": "md"
                  },
                  {
                    "type": "text",
                    "text": String(new Date()).substr(0,24),
                    "size": "xs",
                    "color": "#aaaaaa",
                    "wrap": true
                  },
                  {
                    "type": "separator",
                    "margin": "xxl"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "margin": "xxl",
                    "spacing": "sm",
                    "contents": [
                      {
                        "type": "box",
                        "layout": "horizontal",
                        "contents": items
                      },
                      {
                        "type": "separator",
                        "margin": "xxl"
                      },
                      {
                        "type": "box",
                        "layout": "horizontal",
                        "margin": "xxl",
                        "contents": [
                          {
                            "type": "text",
                            "text": "ยอดรวม",
                            "size": "sm",
                            "color": "#555555"
                          },
                          {
                            "type": "text",
                            "text": sum.toFixed(2) + " บาท",
                            "size": "sm",
                            "color": "#111111",
                            "align": "end"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "separator",
                    "margin": "xxl"
                  },
                  {
                    "type": "box",
                    "layout": "horizontal",
                    "margin": "md",
                    "contents": [
                      {
                        "type": "text",
                        "text": "PAYMENT ID",
                        "size": "xs",
                        "color": "#aaaaaa",
                        "flex": 0
                      },
                      {
                        "type": "text",
                        "text": "#" + new Date().getTime(),
                        "color": "#aaaaaa",
                        "size": "xs",
                        "align": "end"
                      }
                    ]
                  }
                ]
              },
              "styles": {
                "footer": {
                  "separator": true
                }
              }
            }
          }
        ]
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.line.me/v2/bot/message/push',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer <bearer>'
        },
        data : data
      };

      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

    }

    if(msg == "เวลา") {
      sendlinemsg(new Date() + "")
    }
    else if(msg == "สวัสดี") {
      sendlinemsg("มีอะไรให้ช่วยไหมครับ")
    }
    else if(msg == "บิล") {
      sendlineflex()
    }
    return res.status(200).json({code: 200})
  }
  catch(error) {
    return res.status(200).json({code: 200})
  }
})

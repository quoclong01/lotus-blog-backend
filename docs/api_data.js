define({ "api": [
  {
    "type": "POST",
    "url": "/characters",
    "title": "Create Character",
    "name": "Create_Character",
    "group": "Character",
    "version": "1.0.0",
    "description": "<p>Create new character</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "age",
            "description": "<p>Required age of new Character with maximum length of 3 characters.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Required name of new Character with maximum length of 10 charecters.</p>"
          },
          {
            "group": "Parameter",
            "type": "comment",
            "optional": false,
            "field": "comment",
            "description": "<p>Comment of new Character ( can have linebreak ).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "/api/characters",
          "type": "URL"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Character.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "age",
            "description": "<p>Age of the Character.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>Comment of the Character.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"id\": 1,\n  \"name\": \"Quan Do H.\"\n  \"age\": 23,\n  \"comment\": \"Quan is developer\"\n}",
          "type": "character"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "RecordNotFound",
            "description": "<p>The id of the Character was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NameLengthValidation",
            "description": "<p>Name length must be less than or equal to 10 characters long.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NameRequiredValidation",
            "description": "<p>Name length must be less than or equal to 10 characters long.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AgeTypeValidation",
            "description": "<p>Age must be a number.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AgeLengthValidation",
            "description": "<p>Age must be less than or equal 3 characters.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AgeRequiredValidation",
            "description": "<p>Age is required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"RecordNotFound\"\n}\nHTTP/1.1 400 Bad Request\n{\n  \"message\": \"\\\"name\\\" length must be less than or equal to 10 characters long\"\n}\nHTTP/1.1 400 Bad Request\n{\n    \"message\": \"\\\"name\\\" is required\"\n}\nHTTP/1.1 400 Bad Request\n{\n  \"message\": \"\\\"age\\\" must be less than or equal 3 characters\"\n}\nHTTP/1.1 400 Bad Request\n{\n  \"message\": \"\\\"age\\\" must be a number\"\n}\nHTTP/1.1 400 Bad Request\n{\n  \"message\": \"\\\"age\\\" is required\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/character.controller.js",
    "groupTitle": "Character"
  },
  {
    "type": "DELETE",
    "url": "/characters/:id",
    "title": "Delete a Character",
    "name": "Delete_a_Character",
    "group": "Character",
    "version": "1.0.0",
    "description": "<p>Delete certain Character</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Characters unique ID.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "/api/characters/1",
          "type": "URL"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Character.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "age",
            "description": "<p>Age of the Character.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>Comment of the Character.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"id\": 1,\n  \"name\": \"Quan Do H.\"\n  \"age\": 23,\n  \"comment\": \"Quan is developer\"\n}",
          "type": "character"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CharacterNotFound",
            "description": "<p>The id of the Character was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"RecordNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/character.controller.js",
    "groupTitle": "Character"
  },
  {
    "type": "PATCH",
    "url": "/characters/:id",
    "title": "Increase Age of a Character",
    "name": "Increase_Age_of_a_Character",
    "group": "Character",
    "version": "1.0.0",
    "description": "<p>Increase +1 for the age of certain Character</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Characters unique ID.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "/api/characters/1",
          "type": "URL"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Character.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "age",
            "description": "<p>Age of the Character.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>Comment of the Character.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"id\": 1,\n  \"name\": \"Quan Do H.\"\n  \"age\": 23,\n  \"comment\": \"Quan is developer\"\n}",
          "type": "character"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CharacterNotFound",
            "description": "<p>The id of the Character was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"RecordNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/character.controller.js",
    "groupTitle": "Character"
  },
  {
    "type": "GET",
    "url": "/characters",
    "title": "List characters",
    "name": "List_characters",
    "group": "Character",
    "version": "1.0.0",
    "description": "<p>List All Character.</p>",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "/api/characters",
          "type": "URL"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Character.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "age",
            "description": "<p>Age of the Character.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>Comment of the Character.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[\n  {\n    \"id\": 1,\n    \"name\": \"Quan Do H.\"\n    \"age\": 22,\n    \"comment\": \"Quan is developer\"\n  },\n  {\n    \"id\": 2,\n    \"name\": \"Vi Nguyen H. T.\"\n    \"age\": 29,\n    \"comment\": \"Vi is developer\"\n  }\n]",
          "type": "character"
        }
      ]
    },
    "filename": "src/controllers/character.controller.js",
    "groupTitle": "Character"
  },
  {
    "type": "GET",
    "url": "/characters/:id",
    "title": "Read data of a character",
    "name": "Read_data_of_a_character",
    "group": "Character",
    "version": "1.0.0",
    "description": "<p>Read full information of a character</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Characters unique ID.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "/api/characters/1",
          "type": "URL"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Character.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "age",
            "description": "<p>Age of the Character.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>Comment of the Character.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"id\": 1,\n  \"name\": \"Quan Do H.\"\n  \"age\": 22,\n  \"comment\": \"Quan is developer\"\n}",
          "type": "character"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CharacterNotFound",
            "description": "<p>The id of the Character was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"RecordNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/character.controller.js",
    "groupTitle": "Character"
  }
] });

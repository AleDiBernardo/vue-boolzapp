Vue.createApp({
  data() {
    return {
      activeChatIndex: 0,
      searchedWord: "",
      newMessage: "",
      isWriting: false,
      isOptionsClicked: false,
      isContactEmpty: false,
      isAddChatPressed: false,
      newContactName: "",
      emptyFormMessage: "Riempi i campi",
      showFormMessage: false,
      newContactImage: "",
      randomAnswers: [
        "dipende",
        "dubbi? domande?",
        "incredibile",
        "ok",
        "Ehi, cosa ne pensi?"
      ],
      contacts: [
        // {
        //   name: "Michele",
        //   avatar: "img/avatar_1.jpg",
        //   visible: true,
        //   contact_status: "Ultimo accesso oggi alle ",
        //   messages: [
        //     {
        //       date: "15:30",
        //       message: "Hai portato a spasso il cane?",
        //       status: "sent",
        //     },
        //     {
        //       date: "15:50",
        //       message: "Ricordati di stendere i panni",
        //       status: "sent",
        //     },
        //     {
        //       date: "16:15",
        //       message: "Tutto fatto!",
        //       status: "received",
        //     },
        //   ],
        // },
        // {
        //   name: "Fabio",
        //   avatar: "img/avatar_2.jpg",
        //   visible: true,
        //   contact_status: "Ultimo accesso oggi alle ",

        //   messages: [
        //     {
        //       date: "16:30",
        //       message: "Ciao come stai?",
        //       status: "sent",
        //     },
        //     {
        //       date: "16:30",
        //       message: "Bene grazie! Stasera ci vediamo?",
        //       status: "received",
        //     },
        //     {
        //       date: "16:35",
        //       message: "Mi piacerebbe ma devo andare a fare la spesa.",
        //       status: "sent",
        //     },
        //   ],
        // },
        {
          name: "Samuele",
          avatar: "img/avatar_3.jpg",
          visible: true,
          contact_status: "Ultimo accesso oggi alle ",

          messages: [
            {
              date: "10:10",
              message: "La Marianna va in campagna",
              status: "received",
            },
            {
              date: "10:20",
              message: "Sicuro di non aver sbagliato chat?",
              status: "sent",
            },
            {
              date: "16:15",
              message: "Ah scusa!",
              status: "received",
            },
          ],
        },
        {
          name: "Alessandro B.",
          avatar: "img/avatar_4.jpg",
          visible: true,
          contact_status: "Ultimo accesso oggi alle ",

          messages: [
            {
              date: "15:30",
              message: "Lo sai che ha aperto una nuova pizzeria?",
              status: "sent",
            },
            {
              date: "15:50",
              message: "Si, ma preferirei andare al cinema",
              status: "received",
            },
          ],
        },
        // {
        //   name: "Alessandro L.",
        //   avatar: "img/avatar_5.jpg",
        //   visible: true,
        //   contact_status: "Ultimo accesso oggi alle ",

        //   messages: [
        //     {
        //       date: "15:30",
        //       message: "Ricordati di chiamare la nonna",
        //       status: "sent",
        //     },
        //     {
        //       date: "15:50",
        //       message: "Va bene, stasera la sento",
        //       status: "received",
        //     },
        //   ],
        // },
        // {
        //   name: "Claudia",
        //   avatar: "img/avatar_6.jpg",
        //   visible: true,
        //   contact_status: "Ultimo accesso oggi alle ",

        //   messages: [
        //     {
        //       date: "15:30",
        //       message: "Ciao Claudia, hai novità?",
        //       status: "sent",
        //     },
        //     {
        //       date: "15:50",
        //       message: "Non ancora",
        //       status: "received",
        //     },
        //     {
        //       date: "15:51",
        //       message: "Nessuna nuova, buona nuova",
        //       status: "sent",
        //     },
        //   ],
        // },
        {
          name: "Federico",
          avatar: "img/avatar_7.jpg",
          visible: true,
          contact_status: "Ultimo accesso oggi alle ",

          messages: [
            {
              date: "15:30",
              message: "Fai gli auguri a Martina che è il suo compleanno!",
              status: "sent",
            },
            {
              date: "15:50",
              message: "Grazie per avermelo ricordato, le scrivo subito!",
              status: "received",
            },
          ],
        },
        {
          name: "Davide",
          avatar: "img/avatar_8.jpg",
          visible: true,
          contact_status: "Ultimo accesso oggi alle ",

          messages: [
            {
              date: "15:30",
              message: "Ciao, andiamo a mangiare la pizza stasera?",
              status: "received",
            },
            {
              date: "15:50",
              message: "No, l'ho già mangiata ieri, ordiniamo sushi!",
              status: "sent",
            },
            {
              date: "15:51",
              message: "OK!!",
              status: "received",
            },
          ],
        },
      ],
    };
  },
  created() {

    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      this.contacts = JSON.parse(storedContacts);
      if (this.contacts[0].name === "") {
        this.isContactEmpty = true
        console.log("controllato");
      } else if (this.contacts[0].name === "" && this.contacts.length > 1) {
        this.contacts.shift()
        console.log("rimosso elemento vuoto");

      }
    }

    this.updateContactStatus();

  },
  watch: {
    contacts: {
      handler(newContacts) {
        localStorage.setItem("contacts", JSON.stringify(newContacts));
      },
      //permette a vue di osservare i cambiamenti all'interno degli oggetti nidificati
      deep: true,
    },
  },
  methods: {
    sendMessage() {
      if (!this.isContactEmpty) {
        const curHour = luxon.DateTime.now().setZone("Europe/Rome");
        const formattedHour = curHour.toFormat("HH:mm");
    
        if (this.newMessage.trim() !== "") {
          this.contacts[this.activeChatIndex].messages.push({
            date: formattedHour,
            message: this.newMessage.trim(),
            status: "sent",
          });
    
          setTimeout(() => {
            const randNum = Math.floor(Math.random() * this.randomAnswers.length);
            this.contacts[this.activeChatIndex].contact_status = "Sta scrivendo...";
            
            setTimeout(()=> {
              this.contacts[this.activeChatIndex].messages.push({
                date: formattedHour,
                message: this.randomAnswers[randNum],
                status: "received",
              });
              
            }, 1500)
            setTimeout(() => {
              this.contacts[this.activeChatIndex].contact_status = "Online";
              
              setTimeout(() => {
                this.contacts[this.activeChatIndex].contact_status = `Ultimo accesso oggi alle ${formattedHour}`;
              }, 4000);
            }, 2000);
            
          }, 1000);
        }
    
        this.isWriting = false;
      }
    
      this.newMessage = "";
    },
    handleSearch() {
      let shouldShowAllContacts = this.searchedWord === "";
    
      this.contacts.forEach((curContact) => {
        const name = curContact.name.toLowerCase();
        curContact.visible = shouldShowAllContacts || name.includes(this.searchedWord.toLowerCase());
      });
    },
    
    removeMessage(index) {
      this.contacts[this.activeChatIndex].messages.splice(index, 1);
    },
    clearChat() {
      this.contacts[this.activeChatIndex].messages = [{}];
    },
    deleteChat() {
     
      
      if (this.contacts.length > 1 && this.contacts.length -1 === this.activeChatIndex) {
        console.log(this.activeChatIndex);
        console.log(this.contacts.length - 1);
        this.contacts.splice(this.activeChatIndex,1);
        this.activeChatIndex--;
        console.log("if");
        this.chechIfFirstChatIsEmpty()
        
      } else if(this.contacts.length > 1){
        console.log("else if");
        this.contacts.splice(this.activeChatIndex, 1);

      } else {
        console.log("else");
        this.contacts = [
          {
            name: "",
            avatar: "",
            visible: false,
            contact_status: "",

            messages: [{}],
          },
        ];
        this.isContactEmpty = true;
      }
    },
    createChat() {
      
      if (this.newContactImage !== "" && this.newContactName !== "") {
        const newChat = {
          name: this.newContactName,
          avatar: this.newContactImage,
          visible: true,
          contact_status: "",
          messages: [
            {
              date: "",
              message: "",
              status: "",
            },
          ],
        };

        this.chechIfFirstChatIsEmpty()
        
    
        this.contacts.push(newChat);
        this.isContactEmpty = false;
        this.newContactImage = "";
        this.newContactName = "";
        this.isAddChatPressed = false;
    
        this.activeChatIndex = this.contacts.length - 1;
      } else {
        this.showFormMessage = true;
      }
    },
    updateContactStatus() {
      this.contacts.forEach((curContact) => {
        curContact.contact_status = curContact.messages[curContact.messages.length - 1].date;
      });
    },
    chechIfFirstChatIsEmpty(){
      if (this.contacts[0].name === "") {
        this.contacts.shift()
      }
    }
  },
}).mount("#app");

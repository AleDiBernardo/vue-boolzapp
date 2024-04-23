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
        "Ehi, cosa ne pensi?",
        "In bocca al lupo!",
        "Buona giornata!",
        "Fammi sapere!",
        "Tutto bene!",
      ],
      contacts: [
        {
          name: "Michele",
          avatar: "img/avatar_1.jpg",
          visible: true,
          contact_status: "Ultimo accesso oggi alle ",
          messages: [
            {
              date: "15:30",
              message: "Hai portato a spasso il cane?",
              status: "sent",
            },
            {
              date: "15:50",
              message: "Ricordati di stendere i panni",
              status: "sent",
            },
            {
              date: "16:15",
              message: "Tutto fatto!",
              status: "received",
            },
          ],
        },
        {
          name: "Fabio",
          avatar: "img/avatar_2.jpg",
          visible: true,
          contact_status: "Ultimo accesso oggi alle ",

          messages: [
            {
              date: "16:30",
              message: "Ciao come stai?",
              status: "sent",
            },
            {
              date: "16:30",
              message: "Bene grazie! Stasera ci vediamo?",
              status: "received",
            },
            {
              date: "16:35",
              message: "Mi piacerebbe ma devo andare a fare la spesa.",
              status: "sent",
            },
          ],
        },
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
        {
          name: "Alessandro L.",
          avatar: "img/avatar_5.jpg",
          visible: true,
          contact_status: "Ultimo accesso oggi alle ",

          messages: [
            {
              date: "15:30",
              message: "Ricordati di chiamare la nonna",
              status: "sent",
            },
            {
              date: "15:50",
              message: "Va bene, stasera la sento",
              status: "received",
            },
          ],
        },
        {
          name: "Claudia",
          avatar: "img/avatar_6.jpg",
          visible: true,
          contact_status: "Ultimo accesso oggi alle ",

          messages: [
            {
              date: "15:30",
              message: "Ciao Claudia, hai novità?",
              status: "sent",
            },
            {
              date: "15:50",
              message: "Non ancora",
              status: "received",
            },
            {
              date: "15:51",
              message: "Nessuna nuova, buona nuova",
              status: "sent",
            },
          ],
        },
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
    this.contacts.forEach((curContact) => {
      // console.log(curContact);
      curContact.contact_status +=
        curContact.messages[curContact.messages.length - 1].date;
    });
  },
  methods: {
    sendMessage() {
      if (this.isContactEmpty !== true) {
        let curHour = luxon.DateTime.now().setZone("Europe/Rome");
        let formattedHour = curHour.toFormat("HH:mm");
        if (this.newMessage !== "") {
          this.contacts[this.activeChatIndex].messages.splice(0, 1);
          this.contacts[this.activeChatIndex].messages.push({
            date: formattedHour,
            message: this.newMessage.trim(),
            status: "sent",
          });

          setTimeout(() => {
            const randNum =
              Math.floor(Math.random() * this.randomAnswers.length - 1) + 1;
            curHour = luxon.DateTime.now().setZone("Europe/Rome");
            formattedHour = curHour.toFormat("HH:mm");
            this.contacts[this.activeChatIndex].contact_status =
              "Sta scrivendo...";
            setTimeout(() => {
              this.contacts[this.activeChatIndex].contact_status = "Online";
              setTimeout(() => {
                this.contacts[
                  this.activeChatIndex
                ].contact_status = `Ultimo accesso oggi alle ${formattedHour}`;
              }, 4000);
            }, 2000);
            this.contacts[this.activeChatIndex].messages.push({
              date: formattedHour,
              message: this.randomAnswers[randNum],
              status: "received",
            });
          }, 1000);
        }
        this.isWriting = false
      }
      

      this.newMessage = "";
    },
    handleSearch() {
      if (this.searchedWord !== "") {
        this.contacts.forEach((curContact) => {
          const name = curContact.name.toLowerCase();
          if (name.includes(this.searchedWord.toLowerCase())) {
            curContact.visible = true;
          } else {
            curContact.visible = false;
          }
        });
      } else {
        this.contacts.forEach((curContact) => {
          curContact.visible = true;
        });
      }
    },
    removeMessage(index) {
      this.contacts[this.activeChatIndex].messages.splice(index, 1);
    },
    clearChat() {
      this.contacts[this.activeChatIndex].messages = [{}];
    },
    deleteChat() {
      //! Bug non permette di eliminare subito l'ultimo contatto, ma solo
      //! se clicchi successivamente su un altro
      // console.log(this.contacts[this.activeChatIndex]);
      if (this.contacts.length - 1 !== 0) {
        this.contacts.splice(this.activeChatIndex, 1);
      } else {
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
        console.log("ciAO");
      }
    },
    createChat() {
      if (this.newContactImage !== "" && this.newContactName !== "") {
        this.contacts.push({
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
        });
        // this.showFormMessage = false;
        this.isContactEmpty = false;
        this.newContactImage = "";
        this.newContactName = "";
        this.isAddChatPressed = false;

        this.activeChatIndex = this.contacts.length - 1;
      } else {
        this.showFormMessage = true;
      }
    },
  },
}).mount("#app");

import { Component, OnInit, signal } from '@angular/core';
import { Raffle } from '../../interfaces/raffle.interface';

@Component({
  selector: 'app-raffles',
  templateUrl: './raffles.component.html',
  styleUrls: ['./raffles.component.scss']
})
export class RafflesComponent implements OnInit {

  protected raffles = signal<Raffle[]>([])

  ngOnInit(): void {
    // this.raffles.set([
    //   {
    //     raffle_id: 1,
    //     name: "CODE QUEST #1: APP PARA SORTEOS PARA COMUNIDADES",
    //     start_date: "2024-03-11",
    //     end_date: "2023-03-18",
    //     description: "Descripción de la quest: Desarrollar una aplicación web que proporcione a la comunidad de DevTalles una herramienta versátil para realizar sorteos en cualquier momento.",
    //     slug: "code-quest-1-app-para-sorteos-para-comunidades",
    //     image_url: "",
    //     image_thumbnail_url: "",
    //     raffleStatus: {
    //       raffle_status_id: 1,
    //       code: "DRAFT",
    //       name: "Borrador",
    //       sort: 1,
    //       is_finished: false
    //     }
    //   },
    //   {
    //     raffle_id: 2,
    //     name: "CODE QUEST #2: APP PARA SORTEOS PARA COMUNIDADES",
    //     start_date: "2024-03-11",
    //     end_date: "2023-03-18",
    //     description: "Descripción de la quest: Desarrollar una aplicación web que proporcione a la comunidad de DevTalles una herramienta versátil para realizar sorteos en cualquier momento.",
    //     slug: "code-quest-2-app-para-sorteos-para-comunidades",
    //     image_url: "",
    //     image_thumbnail_url: "",
    //     raffleStatus: {
    //       raffle_status_id: 2,
    //       code: "DRAFT",
    //       name: "Borrador",
    //       sort: 2,
    //       is_finished: false
    //     }
    //   },
    //   {
    //     raffle_id: 3,
    //     name: "CODE QUEST #3: APP PARA SORTEOS PARA COMUNIDADES",
    //     start_date: "2024-03-11",
    //     end_date: "2023-03-18",
    //     description: "Descripción de la quest: Desarrollar una aplicación web que proporcione a la comunidad de DevTalles una herramienta versátil para realizar sorteos en cualquier momento.",
    //     slug: "code-quest-3-app-para-sorteos-para-comunidades",
    //     image_url: "",
    //     image_thumbnail_url: "",
    //     raffleStatus: {
    //       raffle_status_id: 3,
    //       code: "DRAFT",
    //       name: "Borrador",
    //       sort: 3,
    //       is_finished: false
    //     }
    //   },
    //   {
    //     raffle_id: 4,
    //     name: "CODE QUEST #4: APP PARA SORTEOS PARA COMUNIDADES",
    //     start_date: "2024-03-11",
    //     end_date: "2023-03-18",
    //     description: "Descripción de la quest: Desarrollar una aplicación web que proporcione a la comunidad de DevTalles una herramienta versátil para realizar sorteos en cualquier momento.",
    //     slug: "code-quest-4-app-para-sorteos-para-comunidades",
    //     image_url: "",
    //     image_thumbnail_url: "",
    //     raffleStatus: {
    //       raffle_status_id: 4,
    //       code: "DRAFT",
    //       name: "Borrador",
    //       sort: 4,
    //       is_finished: false
    //     }
    //   },
    //   {
    //     raffle_id: 5,
    //     name: "CODE QUEST #5: APP PARA SORTEOS PARA COMUNIDADES",
    //     start_date: "2024-03-11",
    //     end_date: "2023-03-18",
    //     description: "Descripción de la quest: Desarrollar una aplicación web que proporcione a la comunidad de DevTalles una herramienta versátil para realizar sorteos en cualquier momento.",
    //     slug: "code-quest-5-app-para-sorteos-para-comunidades",
    //     image_url: "",
    //     image_thumbnail_url: "",
    //     raffleStatus: {
    //       raffle_status_id: 5,
    //       code: "DRAFT",
    //       name: "Borrador",
    //       sort: 5,
    //       is_finished: false
    //     }
    //   },
    //   {
    //     raffle_id: 6,
    //     name: "CODE QUEST #6: APP PARA SORTEOS PARA COMUNIDADES",
    //     start_date: "2024-03-11",
    //     end_date: "2023-03-18",
    //     description: "Descripción de la quest: Desarrollar una aplicación web que proporcione a la comunidad de DevTalles una herramienta versátil para realizar sorteos en cualquier momento.",
    //     slug: "code-quest-6-app-para-sorteos-para-comunidades",
    //     image_url: "",
    //     image_thumbnail_url: "",
    //     raffleStatus: {
    //       raffle_status_id: 6,
    //       code: "DRAFT",
    //       name: "Borrador",
    //       sort: 6,
    //       is_finished: false
    //     }
    //   },
    //   {
    //     raffle_id: 7,
    //     name: "CODE QUEST #7: APP PARA SORTEOS PARA COMUNIDADES",
    //     start_date: "2024-03-11",
    //     end_date: "2023-03-18",
    //     description: "Descripción de la quest: Desarrollar una aplicación web que proporcione a la comunidad de DevTalles una herramienta versátil para realizar sorteos en cualquier momento.",
    //     slug: "code-quest-7-app-para-sorteos-para-comunidades",
    //     image_url: "",
    //     image_thumbnail_url: "",
    //     raffleStatus: {
    //       raffle_status_id: 7,
    //       code: "DRAFT",
    //       name: "Borrador",
    //       sort: 7,
    //       is_finished: false
    //     }
    //   },
    //   {
    //     raffle_id: 8,
    //     name: "CODE QUEST #8: APP PARA SORTEOS PARA COMUNIDADES",
    //     start_date: "2024-03-11",
    //     end_date: "2023-03-18",
    //     description: "Descripción de la quest: Desarrollar una aplicación web que proporcione a la comunidad de DevTalles una herramienta versátil para realizar sorteos en cualquier momento.",
    //     slug: "code-quest-8-app-para-sorteos-para-comunidades",
    //     image_url: "",
    //     image_thumbnail_url: "",
    //     raffleStatus: {
    //       raffle_status_id: 8,
    //       code: "DRAFT",
    //       name: "Borrador",
    //       sort: 8,
    //       is_finished: false
    //     }
    //   }
    // ])
  }

}

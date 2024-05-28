import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Renderer2, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
declare var PrimoPreviewHandler: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  ID!: string | null;
  data: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private dataS: DataService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const ID = params.get('creativeID');
      if (ID) {
        this.loadPreviewData(ID);
      } else {
        console.error('Creative ID is missing');
      }
    });
  }

  loadPreviewData(ID: string): void {
    this.dataS.getData(ID).subscribe(
      (data) => {
        console.log('Data fetched:', data);
        this.data = data;
     
        PrimoPreviewHandler.getHandler({
          creativeID: ID,
        }).then((handler: any) => {
          const previewDiv = document.getElementById('animationPreview');
          if (previewDiv) {
            handler
              .setupPlayer(previewDiv, previewDiv, previewDiv, 'PHONE')
              .then(() => {
                console.log('Animation preview loaded successfully.');
              });
          } else {
            console.error('Preview div not found.');
          }
        });
      },
      (error) => {
        console.error('Error fetching preview data:', error);
      }
    );
  }
}



   // this.data.info = this.data.info || {};

        // this.data.info.fallbackImageUrl = `https://ps.visarity.com/campaigns/${ID}/splash.jpg`;
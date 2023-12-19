import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
//@ts-ignore
import SecureLS from 'secure-ls';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

enum LoadMethod {
  Blob,
  DataUrl,
  DirectUrl
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'securels-test';
  numberOfEncDecCycle = 1

  formControl = new FormControl(this.numberOfEncDecCycle,{ validators:[Validators.required] , nonNullable: true });

  _ls = new SecureLS({
    encodingType: "aes",
    encryptionSecret: "20it20data54554",
  });

  userData = '{"USERCODE":"0","FULLNAME":"مستخدم عام","SECTIONNAME":"أمانة منطقة الرياض","TOKEN":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InB1YmxpYyIsInJvbGUiOiJQdWJsaWNVc2VyIiwibmJmIjoxNzAwODQyNzc3LCJleHAiOjE3MDA4NzUxNzcsImlhdCI6MTcwMDg0Mjc3NywiaXNzIjoiKiIsImF1ZCI6IioifQ.gbwg5R30c-Ixrv-dVLn0hXnJ1427_ng9C6onxx_QUjg","EMAIL":"","MAJOR_CODE":"","MINOR_CODE":"","SEC":[],"COM_DIR_CODE":null,"MOBILE":null}'
  longUserData = this.userData + this.userData 
  + "d1620790-519b-446b-89b6-4513f886eda497934d0d-9cf7-4564-a576-4a3d9f8b3e458d52abea-0474-4963-8ed9-78c6a644e11f7a3ae92a-f51d-40f3-9c93-f520c41a829a6eb25372-0fa6-4955-960a-7ab4d2bfbed5366face5-55b8-41f3-a6bd-99815b5864f34398d0c6-caf9-4962-9084-9b75bccfdee9dc26dd8f-8714-40e4-b43b-3676a0b71697ac8edcd3-f000-466c-ba89-461547a8ef0b27180f57-dc84-471c-b245-96cfc9f7a0c9"
  + "3]b&D{'(k(*0)z.cjs+b5b]wLGLSr>+7swoDUPp#U~U!M2s~5J"

  ngOnInit(){

    
    this.loadPdfIntoIframe(
      "https://mapservice.alriyadh.gov.sa/BuildingSystem/building-code-report-experimental?parcelId=14289493",
      "pdf-id"
      )

  }

  /* 
    // Check if the user is using Chrome
    const isChrome = /Chrome/i.test(navigator.userAgent) && /Google Inc/i.test(navigator.vendor);
 */

  getLoadMethod(): LoadMethod {
    // Check if the user is on a mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // Check if the user is using Chrome
    const isChrome = /Chrome/i.test(navigator.userAgent) && !/Edge/i.test(navigator.userAgent)
    // Check for Samsung Internet browser
    const isSamsungBrowser = /SamsungBrowser/i.test(navigator.userAgent);
    
    // If the user is on mobile Chrome, use DirectUrl, otherwise use Blob
    return (isMobile && (isChrome || isSamsungBrowser)) ? LoadMethod.DirectUrl : LoadMethod.DataUrl;
}

  async loadPdfIntoIframe(pdfUrl: string, iframeId: string): Promise<void> {

    const method = this.getLoadMethod();

    try {
        // Get the iframe element
        const iframe = document.getElementById(iframeId) as HTMLIFrameElement;
        if (!iframe) {
            throw new Error('Iframe not found');
        }

        if (method === LoadMethod.DirectUrl) {
            // Set the PDF URL directly as the source of the iframe
            iframe.src = pdfUrl;
        } else {
            // Fetch the PDF from the URL
            const response = await fetch(pdfUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Convert the response to a Blob
            const pdfBlob = await response.blob();

            if (method === LoadMethod.Blob) {
                // Create a Blob URL
                iframe.src = URL.createObjectURL(pdfBlob);
            } else if (method === LoadMethod.DataUrl) {
                // Convert Blob to data URL
                iframe.src = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(pdfBlob);
                });
            }
        }
    } catch (error) {
        console.error('Error loading PDF into iframe:', error);
    }
}


  encrypt(){


    if (!this.formControl.value || this.formControl.value < 1) {
      alert("يجب إدخال عدد أكبر من 0")
      return
    }

    
    for (let index = 0; index < this.formControl.value; index++) {
      this._ls.set("user",this.userData)
      var data = this._ls.get("user")
      if(data != this.userData){
        alert("حدث خطأ في التشفير في المحاولة رقم "+ (index + 1))
        return
      }
    }

    alert("تم بنجاح التشفير وفك التشفير "+ (this.formControl.value) + " مرة")

  }

  longEncrypt(){
    /* if ('OTPCredential' in window) {
      window.addEventListener('DOMContentLoaded', (e: Event) => {
        const input = document.querySelector('input[autocomplete="one-time-code"]') as HTMLInputElement;
        if (!input) return;
    
        const ac = new AbortController();
        const form = input.closest('form') as HTMLFormElement | null;
    
        if (form) {
          form.addEventListener('submit', (e: Event) => {
            ac.abort();
          });
        }
    
        navigator.credentials.get({
          otp: { transport:['sms'] },
          signal: ac.signal
        }).then((otp: OTPCredential) => {
          input.value = otp.code;
          if (form) form.submit();
        }).catch((err: Error) => {
          console.log(err);
        });
      });
    } */
    
    if (!this.formControl.value || this.formControl.value < 1) {
      alert("يجب إدخال عدد أكبر من 0")
      return
    }

    
    for (let index = 0; index < this.formControl.value; index++) {
      this._ls.set("user",this.longUserData)
      var data = this._ls.get("user")
      if(data != this.longUserData){
        alert("حدث خطأ في التشفير في المحاولة رقم "+ (index + 1))
        return
      }
    }

    alert("تم بنجاح التشفير وفك التشفير "+ (this.formControl.value) + " مرة")

  }
  
}
/* 

const a = ""
type t = string | number | null
type c = Exclude<t, string>

function isString(test: any): test is string{
  return typeof test === "string";
}

function example(foo: any){
  if(isString(foo)){
      console.log("it is a string" + foo);
      console.log(foo.length); // string function
  }
}
example("hello world");


type RGB = readonly [red: number, green: number, blue: number];
type Color = RGB | string;

const palette = {
    red: [255, 0, 0],
    green: "#00ff00",
    blue: [1,2,3],
} satisfies Record<string, Color>;

console.log(palette.green);
//                   ^? green is string


const constantPalette = {
    red: [255, 0, 0],
    green: "#00ff00",
    blue: [1,2,3],
} as const satisfies Record<string, Color>;

console.log(constantPalette.green);


 */

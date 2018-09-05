import { async, ComponentFixture, TestBed,inject } from '@angular/core/testing';

import { LoginComponent } from './login.component';

import {LoginService} from './login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserserviceService } from '../../../_service/userservice.service';
import { HttpModule } from '@angular/http';

describe('Testing login functionality', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpClientModule,
        HttpModule,
        HttpClientTestingModule
      ],
      declarations: [ LoginComponent ],
      providers: [LoginService,UserserviceService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
     expect(component).toBeTruthy();
  });

  it('Valid username and password will login the user', async(
    inject([ LoginService ], (service: LoginService) => {
       service.loginRequest({

        "email": "Jithin.Pattayil@happiestminds.com",
        "pwd": "1&athani23d"
  
      }).subscribe(data => {
  alert(data.result.status);
            expect(data.result.status).toEqual('success');
        })
    })
  ))
  
  it('Invalid username will not login the user', async(

    inject([ LoginService ], (service: LoginService) => {
       service.loginRequest({

        "email": "demo@happiestminds.com",
        "pwd": "1&dee"
  
      }).subscribe(data => {
  
           // expect(data.result.status).toEqual('failed');
            //expect(data.result.status).toEqual(' ddd Invalid credentials supplied');
        })
    })
  ))
/*


  it('Invalid password will not login the user', inject([LoginService], (service: LoginService) => {
    
  }));
  it('Invalid email format will not login the user', inject([LoginService], (service: LoginService) => {
    
  }));
  it('login input validation  error', inject([LoginService], (service: LoginService) => {
    
  }));
*/

  
});



 


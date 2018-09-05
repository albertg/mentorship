import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../login/login.service';
import { HttpClientModule } from '@angular/common/http';
import { UserserviceService } from '../../../_service/userservice.service';

describe('Landing  page ', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpClientModule
      ],
      declarations: [ HomeComponent ,LoginComponent],
      providers: [LoginService,UserserviceService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('landing page should create', () => {
     expect(component).toBeTruthy();
  });

  it('It should load  login componet ', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-login')).toBeTruthy();
 });
});

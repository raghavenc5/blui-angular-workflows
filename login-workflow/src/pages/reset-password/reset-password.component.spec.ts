import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PxbResetPasswordComponent } from './reset-password.component';

describe('ResetPasswordComponent', () => {
    let component: PxbResetPasswordComponent;
    let fixture: ComponentFixture<PxbResetPasswordComponent>;

    beforeEach(async(() => {
        void TestBed.configureTestingModule({
            declarations: [PxbResetPasswordComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PxbResetPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });
});

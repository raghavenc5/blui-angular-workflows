import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PxbCreateAccountComponent } from './create-account.component';

describe('CreateAccountComponent', () => {
    let component: PxbCreateAccountComponent;
    let fixture: ComponentFixture<PxbCreateAccountComponent>;

    beforeEach(async(() => {
        void TestBed.configureTestingModule({
            declarations: [PxbCreateAccountComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PxbCreateAccountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        void expect(component).toBeTruthy();
    });
});

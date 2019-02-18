import {Menu} from './menu';
import {Item} from "./item";


describe('Menu', () => {
    it('should create an instance', () => {
        expect(new Menu(1,
            "Main Menu",
            new Item(2,
                "Chips and Queso (4oz)",
                "Chips and Queso (4oz)",
                3.75, 1,
                "https://doordash-static.s3.amazonaws.com/media/photos/016a04fe-6cb9-4fd7-a2e2-7c9722b0fab4-retina-large.jpg")
        )).toBeTruthy();
    });
});

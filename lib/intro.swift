//
//  DetailViewController.swift
//  SimpleContact
//
//  Created by Michael Kaminsky on 9/11/14.
//  Copyright (c) 2014 Michael Kaminsky. All rights reserved.
//

import UIKit

class DetailViewController: UIViewController {

    @IBOutlet weak var detailDescriptionLabel: UILabel!
    @IBOutlet weak var nav: UINavigationItem!
    @IBOutlet weak var nameInput: UITextField!
    @IBOutlet weak var edit_button: UIBarButtonItem!
    
    
    
    var isEditing = false;
    var index = 0;
    
    
    @IBAction func trigger(sender: AnyObject) {
        if(self.isEditing == false){
            //turn to true
            
            self.isEditing = true;
            println("start");
            
            nameInput.borderStyle = UITextBorderStyle.RoundedRect;
            nameInput.enabled = true;
        }
        else{
            //turn to false
            
            self.isEditing = false;
            println("stop");
            
            nameInput.borderStyle = UITextBorderStyle.None;
            nameInput.enabled = false;
            
            self.updateData();
            
        }
    }
    var detailItem: AnyObject? {
        didSet {
            // Update the view.
            self.configureView()
        }
    }
    
    var birth: AnyObject? {
        didSet {
            self.configureView();
        }
    }
    

    func configureView() {
        // Update the user interface for the detail item.
        if let detail: AnyObject = self.detailItem {
            if let name_input = self.nameInput {
                
                nav.title = detail.description;
                
                nameInput.borderStyle = UITextBorderStyle.None;
                nameInput.enabled = false;
                name_input.text = detail.description
                
                
                
            }
        }
    }
    
    func updateData(){
        var newName = nameInput.text + "_index_" + String(index);
        
        NSNotificationCenter.defaultCenter().postNotificationName("newName", object: newName); //send it
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        self.configureView()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}



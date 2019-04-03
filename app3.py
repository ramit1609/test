from flask import Flask, render_template, redirect, url_for, request, jsonify,Response
from werkzeug import secure_filename
import os
import threading
import random
import pickle
import cv2


app=Flask(__name__)
PORT = int(os.getenv('PORT', 8000))
NUM,POS=1,20
RETURN='<div class="received" style="border:10px solid transparent;width:49%;background-color:#e4ffce;border-radius:45%;text-align:center;float: left;font-size: 20px;" >'

#variables to sync the threads of server and the predicter

output=False
Input=False
Out,In="",""
IMG=0

'''loading the resuts saved by symptoms.py file'''
#dise=pickle.load(open(os.path.join("\\".join(os.path.abspath(__file__).split("\\")[:-1]),"dise.pickle"),"rb"))
#symp=pickle.load(open(os.path.join("\\".join(os.path.abspath(__file__).split("\\")[:-1]),"symp.pickle"),"rb"))

def check(a,b):
    count=0
    for i in a:
        if i in b:
            count+=1
    return count
def collision_solver(ans,inp):
    global Input,In,output,Out,NUM,RETURN
    space=[]
    for i in ans:
        for symptom in symp[i[1]]:
            if symptom in space:
                space.remove(symptom)
            elif symptom not in inp:
                space.append(symptom)
    if not space:
        return ans
    random.shuffle(space)
    symptom=""
    for i in space:
        R=RETURN[:20]+'d'*NUM+'"'+RETURN[21:]
        NUM+=1
        Out=R+"Do you feel:- "+i+"</div>"+"<br>"
        print(Out)
        output=True
        Input=False
        ''' inpuut must be yes or no'''
        while not Input:pass
        a=In

        if a=="yes":
            symptom=i
            break
    for i in ans:
        if symptom in symp[i[1]]:
            return [i]
def comp(inp):
    global Input,In,output,Out,NUM,RETURN
    inp=inp.split(",")
    m=0
    ans=[]
    for i in symp:
        x=check(symp[i],inp)
        if x>m:
            ans=[dise[i]]
            m=x
        elif x==m:
            ans.append(dise[i])
    if len(ans)>1:
        ans=collision_solver(ans,inp)
        Out=""
        for i in ans:
            Out+=i[0]+","
        R=RETURN[:20]+'d'*NUM+'"'+RETURN[21:]
        NUM+=1
        Out=R+"you may be suffering from:"+Out[:-1]
        output=True
        Input=False
    else:
        R=RETURN[:20]+'d'*NUM+'"'+RETURN[21:]
        NUM+=1
        Out=R+"you may be suffering from: "+ans[0][0]
        output=True
        Input=False

def predict(): 
    a=In           
    comp(a)
''' input is the set of initial symptoms seperated by commas and without 
any trailing or leading spaces
'''
#MODEL=pickle.load(open(os.path.join("\\".join(os.path.abspath(__file__).split("\\")[:-1]),"Knn.pickle"),"rb"))
#labels_symptoms=os.path.join("\\".join(os.path.abspath(__file__).split("\\")[:-1]),"dataset\\symptoms.txt")

def solve_overlapp(ans):
    global IMG,Out,output,Input,In,NUM,RETURN
    print("solving")
    print(ans)
    with open(labels_symptoms,"r") as f:
        line_no=0
        for line in ans:
            temp=line-line_no-1
            print(temp,line,line_no)
            line_no=line
            while temp:
                f.readline()
                temp-=1
                print("here")
            line=f.readline().split(":")
            symp=line[1].split(",")
            for i in symp:
                R=RETURN[:20]+'d'*NUM+'"'+RETURN[21:]
                NUM+=1
                Out=R+"do u experience %s " %i
                output=True
                Input=False
                ''' inpuut must be yes or no'''
                print("stuck",Input)
                while not Input:pass
                a=In
                #a=input("do u experience %s " %i)######
                if a=="yes":
                    IMG=0
                    R=RETURN[:20]+'d'*NUM+'"'+RETURN[21:]
                    NUM+=1
                    Out=R+"you may be suffering from: %s" %line[0]
                    output=True
                    Input=False
                    print("you may be suffering from",line[0])####
                    return
    IMG=0
    R=RETURN[:20]+'d'*NUM+'"'+RETURN[21:]
    NUM+=1
    Out=R+"try with a zoomed image of infected area. "
    output=True
    Input=False
    print("try with a zoomed image of infected area. ")######
    
def predict_image(x_pred):
    global IMG,Out,output,Input,NUM,RETURN
    print("in predict")
    import pickle
    model=MODEL
    predicted_values=model.predict_proba(x_pred)
    prob=[]
    found=0
    for i in range(len(predicted_values)):
        if predicted_values[i][0][1] >= 0.2:
            if predicted_values[i][0][1] >= 0.5:
                found=1
            prob.append(i+2)
    if not found:
        prob.insert(0,1)
    if len(prob)>1:
        solve_overlapp(prob)
    else:
        IMG=0
        R=RETURN[:20]+'d'*NUM+'"'+RETURN[21:]
        NUM+=1
        Out=R+"you may be suffering from: %s" %"Acne"
        output=True
        Input=False
        print("Acne")                            #########
    

def predictor(loc):
    print("in Predictor")
    print(loc)
    array=cv2.imread(loc)
    x_pred=cv2.resize(array,(100,100)).flatten().reshape(1,-1) 
    ans=predict_image(x_pred)

@app.route('/background_process')
def background_process():
    try:
        global Input,In,output,Out,IMG,NUM,RETURN
        lang=request.args.get('proglang')
        lang=str(lang)
        print("lang=",lang)
        output=False
        arg=0
        if lang not in ["yes","no"]:
        	arg=1
        t=threading.Thread(target=predict,name="thread")
        Input=True
        In=lang
        output=False
        if arg and IMG==0:
        	print("thread began")
        	t.start()

        while not output:pass
        return jsonify(Out)

    except Exception as e:
        print(e)
        return 

UPLOAD_FOLDER = 'uploads/'
ALLOWED_EXTENSIONS = set(['jpg', 'jpeg'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

@app.route('/upload',methods=['GET','POST'])
def upload():
    global IMG,Input,In,output,Out
    print("received")
    file=request.files['file']
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        print(type(filename),filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        print("saved")
        
        image_path=os.path.join("\\".join(os.path.abspath(__file__).split("\\")[:-1]),"uploads\\%s" %filename)
        IMG=1

        t_img=threading.Thread(target=predictor,name="thread2",args=(image_path,))
        output=False
        Out=""
        t_img.start()

        while not output:pass
        print(Out)
        return jsonify(Out)
    return jsonify('Image upload faild')
    

@app.route('/',methods=["GET","POST"])
def page():
    try:
        return render_template("upload.html")
    except Exception as e:
        return str(e)

app.run(debug=True,port=PORT)

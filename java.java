import java.awt.AlphaComposite;
import java.awt.geom.AffineTransform;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;
import java.io.File;
import java.io.IOException;
import java.awt.image.BufferedImage;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.GraphicsEnvironment;
import java.awt.FontFormatException;
import java.lang.String;
import java.net.URL;
import javax.imageio.*;
import java.awt.image.*;
import java.awt.image.ColorConvertOp;
import java.awt.color.ColorSpace;
import java.io.*;
import java.awt.*;
import java.awt.geom.*;
import java.util.EnumMap;
import java.util.Map;
 
import javax.imageio.ImageIO;
 
import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
//from  ww  w .j a v a  2  s  .c  o  m
import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;
import java.awt.geom.*;



public class java {
   public static String uniqCode1 = "hell";
    public static void main(String[] args) throws Exception {
      
    //   String uId = getUniqeId(args[0]);
    uniqCode1 = args[1];
    imageRounder(uniqCode1);
    Qrcode("http://localhost/hmw3/profile.html?user_id="+args[2],uniqCode1);
    
    String add = imageIoWrite("C://wamp64/www/hmw3/assets/img/images/HELLOmywork_id_card_BLANK_GREEN-min.png", args[0]);
    File pro = new File("C://wamp64/www/hmw3/assets/img/profile/userimage/"+uniqCode1+"rounded.png");
    File pro1 = new File("C://wamp64/www/hmw3/assets/img/profile/userimage/"+uniqCode1+"rounded.png");
    File qrcode = new File("C://wamp64/www/hmw3/assets/img/profile/QRCode/"+uniqCode1+".png");
    File url = new File(add);
    BufferedImage im = ImageIO.read(url);
    BufferedImage qrImage = ImageIO.read(qrcode);
    URL url2 = new URL("http://www.java2s.com/style/download.png");
    BufferedImage im2 = ImageIO.read(pro);
    BufferedImage grayImg = ImageIO.read(pro1);
    BufferedImage gray = new BufferedImage(grayImg.getWidth(),
    grayImg.getHeight(), BufferedImage.TYPE_INT_ARGB);
    BufferedImage colorImage = new BufferedImage(grayImg .getWidth(), grayImg .getHeight(), BufferedImage.TYPE_BYTE_GRAY);
    Graphics2D graphics = colorImage.createGraphics();
    ColorConvertOp op = new ColorConvertOp(
        ColorSpace.getInstance(ColorSpace.CS_GRAY), null);
    op.filter(grayImg, gray);
    graphics.drawImage(grayImg ,0,0,null);
    Graphics2D g = im.createGraphics();
    g.drawImage(im2, 50,220,168,168, null);
    g.drawImage(gray, 665,320,72,72, null);
    g.drawImage(qrImage,650,50,100,100, null);

    AffineTransformOp op2 = new AffineTransformOp(rotateClockwise90(im), AffineTransformOp.TYPE_BILINEAR);
    im =op2.filter(im, null);
    Graphics2D g1 = im.createGraphics();
    g1.setColor(Color.WHITE);
    g1.setFont(new Font("Arial", Font.BOLD, 15));
    String uId = uniqCode1;
    uId = uId.replace("", " ").trim();
    g1.drawString(uId, 120, 785);
    op2 = new AffineTransformOp(rotateCounterClockwise90(im), AffineTransformOp.TYPE_BILINEAR);
    im =op2.filter(im, null);

    g.dispose();
    display(im);
    ImageIO.write(im, "png", new File("C://wamp64/www/hmw3/assets/img/profile/card/"+uniqCode1+".png"));


    add = imageIoWrite("C://wamp64/www/hmw3/assets/img/images/HELLOmywork_id_card_BLANK_GOLD-min.png", args[0]);
    pro = new File("C://wamp64/www/hmw3/assets/img/profile/userimage/"+uniqCode1+"rounded.png");
    pro1 = new File("C://wamp64/www/hmw3/assets/img/profile/userimage/"+uniqCode1+"rounded.png");
    url = new File(add);
    im = ImageIO.read(url);
    url2 = new URL("http://www.java2s.com/style/download.png");
    im2 = ImageIO.read(pro);
    grayImg = ImageIO.read(pro1);
    colorImage = new BufferedImage(grayImg .getWidth(), grayImg .getHeight(), BufferedImage.TYPE_BYTE_GRAY);
    graphics = colorImage.createGraphics();
    graphics.drawImage(grayImg ,0,0,null);
    g = im.createGraphics();
    g.drawImage(im2, 50,220,168,168, null);
    g.drawImage(gray, 665,320,72,72, null);
    g.drawImage(qrImage,650,50,100,100, null);
    
    op2 = new AffineTransformOp(rotateClockwise90(im), AffineTransformOp.TYPE_BILINEAR);
    im =op2.filter(im, null);
    g1 = im.createGraphics();
    g1.setColor(Color.WHITE);
    g1.setFont(new Font("Arial", Font.BOLD, 15));
    // g1.setFont(g.getFont().deriveFont(17f));
    
    g1.drawString(uId, 120, 785);
    op2 = new AffineTransformOp(rotateCounterClockwise90(im), AffineTransformOp.TYPE_BILINEAR);
    im =op2.filter(im, null);
    display(im);
    g.dispose();
    ImageIO.write(im, "png", new File("C://wamp64/www/hmw3/assets/img/profile/card/"+uniqCode1+"Gold.png"));
    


  }

  public static void display(BufferedImage image) {
    JFrame f = new JFrame();
    f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    f.getContentPane().add(new JLabel(new ImageIcon(image)));
    f.pack();
    f.setVisible(true);
  }
      // Rotates clockwise 90 degrees. Uses rotation on center and then translating it to origin
      private static  AffineTransform rotateClockwise90(BufferedImage source) {
        AffineTransform transform = new AffineTransform();
        transform.rotate(Math.PI/2, source.getWidth()/2, source.getHeight()/2);
        double offset = (source.getWidth()-source.getHeight())/2;
        transform.translate(offset,offset);
        return transform;
    }
     
    // Rotates counter clockwise 90 degrees. Uses rotation on center and then translating it to origin
    private static  AffineTransform rotateCounterClockwise90(BufferedImage source) {
        AffineTransform transform = new AffineTransform();
        transform.rotate(-Math.PI/2, source.getWidth()/2, source.getHeight()/2);
        double offset = (source.getWidth()-source.getHeight())/2;
        transform.translate(-offset,-offset);
        return transform;
    }

  public static void Qrcode(String data, String name){
    String myCodeText = data;
    String filePath = "C://wamp64/www/hmw3/assets/img/profile/QRCode/"+name+".png";
    int size = 250;
    String fileType = "png";
    File myFile = new File(filePath);
    try {
        
        Map<EncodeHintType, Object> hintMap = new EnumMap<EncodeHintType, Object>(EncodeHintType.class);
        hintMap.put(EncodeHintType.CHARACTER_SET, "UTF-8");
        
        // Now with zxing version 3.2.1 you could change border size (white border size to just 1)
        hintMap.put(EncodeHintType.MARGIN, 1); /* default = 4 */
        hintMap.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.L);

        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix byteMatrix = qrCodeWriter.encode(myCodeText, BarcodeFormat.QR_CODE, size,
                size, hintMap);
        int CrunchifyWidth = byteMatrix.getWidth();
        BufferedImage image = new BufferedImage(CrunchifyWidth, CrunchifyWidth,
                BufferedImage.TYPE_INT_RGB);
        image.createGraphics();

        Graphics2D graphics = (Graphics2D) image.getGraphics();
        graphics.setColor(Color.WHITE);
        graphics.fillRect(0, 0, CrunchifyWidth, CrunchifyWidth);
        graphics.setColor(Color.BLACK);

        for (int i = 0; i < CrunchifyWidth; i++) {
            for (int j = 0; j < CrunchifyWidth; j++) {
                if (byteMatrix.get(i, j)) {
                    graphics.fillRect(i, j, 1, 1);
                }
            }
        }
        ImageIO.write(image, fileType, myFile);
    } catch (WriterException e) {
        e.printStackTrace();
    } catch (IOException e) {
        e.printStackTrace();
    }
    // System.out.println("\n\nYou have successfully created QR Code.");
}
  

  public static String  getUniqeId(String args1){
        String [] args = args1.split("~");
        int i = 0;
        String uniqCode = "HMW";
        String date;
        String [] name,location,role;
        name = args[0].split("_");
        int nameLen = name[0].length(); 
        if(nameLen>=6){
            String temp = name[0].substring(0,6);
            temp = temp.toUpperCase();
            uniqCode = uniqCode + temp;
        }
        else{
            String temp = name[0].substring(0,nameLen);
            temp = temp.toUpperCase();
            uniqCode = uniqCode + temp;
            for(i=(6-nameLen);i>0;i--){
                uniqCode+="X";
            }
            
        }
        role = args[1].split("_");
        if(role.length>1){
            char temp = role[0].charAt(0);
            String s=String.valueOf(temp);  
            uniqCode = uniqCode + s.toUpperCase();
            temp = role[1].charAt(0);
            s=String.valueOf(temp);  
            uniqCode = uniqCode + s.toUpperCase();
        }
        else if(role.length<2){
            char temp = role[0].charAt(0);
            String s=String.valueOf(temp);  
            uniqCode = uniqCode + s.toUpperCase();
            uniqCode = uniqCode + "X";
        }

        location = args[2].split("_");
        int locLen = location[0].length();
        // System.out.println(locLen);

        if(locLen>3){
            location[0] = location[0].toUpperCase();
            uniqCode = uniqCode + location[0].substring(0,3);
        }
        else{
            location[0] = location[0].toUpperCase();
            uniqCode = uniqCode + location[0].substring(0,locLen);
            for(i=(3-locLen);i>0;i--){
                uniqCode+="X";
            }
            
        }
        date = args[3];
        uniqCode = uniqCode + date.substring(0,2);
        // System.out.println(uniqCode);
        return uniqCode;
  }

    public static String imageIoWrite(String url3, String data) {
         BufferedImage bImage = null;
         String address="";
         try {
             File url = new File(url3);
             bImage = ImageIO.read(url); 
            data = data.replace("_", " ").trim();
            String str = data; //some text with line breaks;
            String [] lines = str.split("~");
            String name = lines[0];
            String role = lines[1];
            String location = "";
            String jdate = lines[3];
            String uniqe = "";
            jdate = jdate.split(": ")[1];
            // String [] address1 = lines[4].split(",");
            // System.out.println(address1);
            Graphics2D g = bImage.createGraphics();
            g.setColor(Color.decode("#C0C0C0"));
            g.setFont(g.getFont().deriveFont(20f));
            int lineHeight = g.getFontMetrics().getHeight() +5;
            for(int lineCount = 0; lineCount < lines.length; lineCount ++){ //lines from above
                g.setColor(Color.decode("#C0C0C0"));
                g.setFont(g.getFont().deriveFont(20f));
                int xPos = 250;
                int yPos = 230 + lineCount * lineHeight;
                String line = lines[lineCount];
                if(lineCount == 0){
                    g.setColor(Color.WHITE);
                    g.setFont(new Font("Arial", Font.BOLD, 25));
                    g.drawString(lines[0], 250, 230);
                    continue;
                }
                else if(lineCount == 5){
                    String [] address1 = lines[5].split(",");
                    g.setColor(Color.decode("#C0C0C0"));
                    g.setFont(g.getFont().deriveFont(18f));
                    for(int lineCount1 = 0; lineCount1 < address1.length; lineCount1 ++){
                        int xPos1 = 335;
                        int yPos1 = yPos + (lineCount1 * lineHeight)/2;
                        // System.out.println((lineCount1 * lineHeight)/2);
                        location = address1[address1.length-1];
                        String line1 = address1[lineCount1];
                        if(lineCount1 == 0){
                            g.drawString(line1, 250, yPos1);
                            continue;
                        }
                        g.drawString(line1, xPos1, yPos1);
                    }
                    continue;
                }
                g.drawString(line, xPos, yPos);
            }
                String str1 = ""+name+"~"+role+"~"+location+"~"+jdate+"";
                String uId = uniqCode1;
                // uniqCode1 = uId;
                // System.out.println(uniqCode1);
                uId = uId.replace("", " ").trim();
                g.setColor(Color.WHITE);
                g.setFont(new Font("Arial", Font.BOLD, 25));
                g.drawString(uId, 180, 475);

            //     lines = uId.split(" ");
            //     int zero = 0;
            // for(int lineCount = (lines.length-1); lineCount >= 0; lineCount--){ //lines from above
            //     g.setColor(Color.WHITE);
            //     g.setFont(g.getFont().deriveFont(15f));
            //     int xPos = 770;
            //     int yPos = 100 + (lineCount * lineHeight)/2;
            //     String line = lines[zero];
            //     zero++;
            //     // AffineTransform at = new AffineTransform();
            //     // at.setToRotation(Math.PI / 4.0);
            //     // g.setTransform(at);
            //     // g.rotate(-Math.PI/2);
            //     // g.rotate();
                
            //     // AffineTransform orig = g.getTransform();
            //     // g.rotate(-Math.PI/2);
            //     // // g.setColor(Color.BLACK);
            //     // g.drawString(datos[i].titulo,(float)alto,(float)paso);
            //     // g.setTransform(orig);
            //     g.drawString(line, xPos, yPos);
            // }



            g.dispose();
            address = "C://wamp64/www/hmw3/assets/img/profile/card/"+lines[0]+".png";
             ImageIO.write(bImage, "png", new File(address));
         } catch (IOException e) {
               System.out.println("Exception occured :" + e.getMessage());
         }
        return address;
    }

    public static void imageRounder(String url) throws Exception{
        try{
        // System.out.println(url);

        // Get the BufferedImage object for the image file
        
        File url3 = new File("C://wamp64/www/hmw3/assets/img/profile/userimage/"+url+".png");
        BufferedImage originalImg=ImageIO.read(url3);
        // Get the width,height of the image
        int width=originalImg.getWidth();
        int height=originalImg.getHeight();
        
        // Create a new BufferedImage object with the width,height
        // equal to that of the image file
        BufferedImage bim=new BufferedImage(width,height,BufferedImage.TYPE_INT_ARGB);
        
        // Create a Graphics2D object by using
        // createGraphics() method. This object is 
        // used to perform the operation!
        Graphics2D g2=bim.createGraphics();
        
        // You can also use rendering hints
        // to smooth the edges or the rounded rectangle
        RenderingHints qualityHints = new RenderingHints(RenderingHints.KEY_ANTIALIASING,RenderingHints.VALUE_ANTIALIAS_ON);
        qualityHints.put(RenderingHints.KEY_RENDERING,RenderingHints.VALUE_RENDER_QUALITY);
        g2.setRenderingHints(qualityHints);
        
        // This method does it all!. You can clip the
        // image into the shape you wish, play it as you like!

        g2.setClip(new RoundRectangle2D.Double(0,0,width,height,40,40));

        // System.out.println(width+"\n"+height+"\n"+width/4+"\n"+height/4);
        
        // Now, draw the image. The image is now
        // in the 'clipped' shape, the shape in the setClip()
        g2.drawImage(originalImg,0,0,null);
        
        // Dispose it, we no longer need it.
        g2.dispose();
        
        // Write to a new image file
        ImageIO.write(bim,"PNG",new File("C://wamp64/www/hmw3/assets/img/profile/userimage/"+url+"rounded.png"));
        }
        catch(Exception e){

        }
       

    }

      public static String imageIoWrite1(String url3, String data) {
         BufferedImage bImage = null;
         String address="";
        String uniqe = "";
         try {
             File url = new File(url3);
             bImage = ImageIO.read(url); 
            data = data.replace("_", " ").trim();
            String str = data; //some text with line breaks;
            String [] lines = str.split("~");
            String name = lines[0];
            String role = lines[1];
            String location = "";
            String jdate = lines[3];

            jdate = jdate.split(": ")[1];
            // String [] address1 = lines[4].split(",");
            // System.out.println(address1);
            Graphics g = bImage.getGraphics();
            g.setColor(Color.decode("#C0C0C0"));
            g.setFont(g.getFont().deriveFont(20f));
            int lineHeight = g.getFontMetrics().getHeight() +5;
            for(int lineCount = 0; lineCount < lines.length; lineCount ++){ //lines from above
                g.setColor(Color.decode("#C0C0C0"));
                g.setFont(g.getFont().deriveFont(20f));
                int xPos = 250;
                int yPos = 230 + lineCount * lineHeight;
                String line = lines[lineCount];
                if(lineCount == 0){
                    g.setColor(Color.WHITE);
                    g.setFont(new Font("Arial", Font.BOLD, 25));
                    g.drawString(lines[0], 250, 230);
                    continue;
                }
                else if(lineCount == 5){
                    String [] address1 = lines[5].split(",");
                    g.setColor(Color.decode("#C0C0C0"));
                    g.setFont(g.getFont().deriveFont(18f));
                    for(int lineCount1 = 0; lineCount1 < address1.length; lineCount1 ++){
                        int xPos1 = 335;
                        int yPos1 = yPos + (lineCount1 * lineHeight)/2;
                        // System.out.println((lineCount1 * lineHeight)/2);
                        location = address1[address1.length-1];
                        String line1 = address1[lineCount1];
                        if(lineCount1 == 0){
                            g.drawString(line1, 250, yPos1);
                            continue;
                        }
                        g.drawString(line1, xPos1, yPos1);
                    }
                    continue;
                }
                g.drawString(line, xPos, yPos);
            }
                String str1 = ""+name+"~"+role+"~"+location+"~"+jdate+"";
                String uId = getUniqeId(str1);
                uniqCode1 = uId;
                System.out.println(uniqCode1);
                uId = uId.replace("", " ").trim();
                g.setColor(Color.WHITE);
                g.setFont(new Font("Arial", Font.BOLD, 25));


                // Graphics2D g2 = (Graphics2D) g;
                Font font = new Font(null, Font.PLAIN, 10);    
                AffineTransform affineTransform = new AffineTransform();
                affineTransform.rotate(Math.toRadians(45), 0, 0);
                Font rotatedFont = font.deriveFont(affineTransform);
                g.setFont(rotatedFont);
                g.drawString("A String",0,0);


                g.drawString(uId, 230, 475);
            g.dispose();
            address = "C://wamp64/www/hmw3/assets/img/profile/card/"+lines[0]+".png";
            //  ImageIO.write(bImage, "png", new File(address));
         } catch (IOException e) {
               System.out.println("Exception occured :" + e.getMessage());
         }
        return uniqe;
    }
}

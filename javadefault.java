import java.awt.AlphaComposite;
import java.awt.List;
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
import java.awt.FontMetrics;
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
import java.nio.file.*; 


public class javadefault {
   public static String uniqCode1 = "hell";
    public static void main(String[] args) throws Exception {

    uniqCode1 = args[1];
    imageRounder(uniqCode1);
    Qrcode("http://HelloMyWork.com/profile.html?user_id="+args[2],uniqCode1);
    String addressIn = args[3];

    String pathImage = "";
    if(args[4].equals("type1")){
        pathImage = "/var/www/html/assets/img/images/id_card_basic.png";
    }
    else if(args[4].equals("type2")){
        pathImage = "/var/www/html/assets/img/images/id_card_premium.png";
    }
    else if(args[4].equals("type3")){
        pathImage = "/var/www/html/assets/img/images/id_card_premium_company.png";
    }
    else{
        pathImage = "/var/www/html/assets/img/images/id_card_basic.png";
    }
    
    String add = imageIoWrite(pathImage, args[0], args[1], addressIn);
    File pro = new File("/var/www/html/assets/img/images/profilerounded.png");
    File pro1 = new File("/var/www/html/assets/img/images/profilerounded.png");
    File qrcode = new File("/var/www/html/assets/img/profile/QRCode/"+uniqCode1+".png");
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
    g.drawImage(im2, 69,219,162,163, null);
    g.drawImage(gray, 645,314,72,72, null);
    g.drawImage(qrImage,630,48,100,100, null);
    AffineTransformOp op2 = new AffineTransformOp(rotateClockwise90(im), AffineTransformOp.TYPE_BILINEAR);
    im =op2.filter(im, null);
    Graphics2D g1 = im.createGraphics();
    g1.setColor(Color.WHITE);
    g1.setFont(new Font("Arial", Font.BOLD, 15));
    String uId = uniqCode1;
    uId = uId.replace("", " ").trim();
    g1.drawString(uId, 100, 770);
    op2 = new AffineTransformOp(rotateCounterClockwise90(im), AffineTransformOp.TYPE_BILINEAR);
    im =op2.filter(im, null);
    g.dispose();
    ImageIO.write(im, "png", new File("/var/www/html/assets/img/profile/card/"+uniqCode1+".png"));

    BufferedImage bufferedImage;
    bufferedImage = ImageIO.read(new File("/var/www/html/assets/img/profile/card/"+uniqCode1+".png"));

    // create a blank, RGB, same width and height, and a white background
    BufferedImage newBufferedImage = new BufferedImage(bufferedImage.getWidth(),
          bufferedImage.getHeight(), BufferedImage.TYPE_INT_RGB);
    newBufferedImage.createGraphics().drawImage(bufferedImage, 0, 0, Color.WHITE, null);

    // write to jpeg file
    ImageIO.write(newBufferedImage, "jpg", new File("/var/www/html/assets/img/profile/card/"+uniqCode1+".jpg"));

    String path = "/var/www/html/assets/img/profile/card/"+uniqCode1+"blank.png";
    String path1 = "/var/www/html/assets/img/profile/card/"+uniqCode1+".png";
    try {
        Files.deleteIfExists(Paths.get(path)); 
        Files.deleteIfExists(Paths.get(path1)); 
    } catch (NoSuchFileException x) {
        System.err.format("%s: no such" + " file or directory%n", path);
    } catch (DirectoryNotEmptyException x) {
        System.err.format("%s not empty%n", path);
    } catch (IOException x) {
        // File permission problems are caught here.
        System.err.println(x);
    }

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
    String filePath = "/var/www/html/assets/img/profile/QRCode/"+name+".png";
    int size = 250;
    String fileType = "png";
    File myFile = new File(filePath);
    try {
        // System.out.println("Debug");
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
        // System.out.println("Debug256");
        ImageIO.write(image, fileType, myFile);
    } catch (WriterException e) {
        e.printStackTrace();
    } catch (IOException e) {
        e.printStackTrace();
    }
}
  
public static String imageIoWrite(String url3, String data, String uid, String AddressIn) {
        BufferedImage bImage = null;
        String address="";
        try {
            File url = new File(url3);
            bImage = ImageIO.read(url); 
            int imagewidth  = bImage.getWidth();
            data = data.replace("_", " ").trim();
            String str = data; //some text with line breaks;
            String [] lines = str.split("~");
            String name = lines[0];
            String role = lines[1];
            String location = "";
            String jdate = lines[3];
            String uniqe = "";
            jdate = jdate.split(": ")[1];
            Graphics2D g = bImage.createGraphics();
            g.setColor(Color.decode("#C0C0C0"));
            g.setFont(g.getFont().deriveFont(20f));
            int lineHeight = g.getFontMetrics().getHeight();
            int offset = 0;
            for(int lineCount = 0; lineCount < lines.length; lineCount ++){ //lines from above
                g.setColor(Color.decode("#ffffff"));
                g.setFont(g.getFont().deriveFont(18f));
                int xPos = 250;
                int yPos = 220 + offset + lineCount * lineHeight;
                // System.out.println("pos:"+yPos);
                String line = lines[lineCount];
                if(lineCount == 0){
                    g.setColor(Color.WHITE);
                    g.setFont(new Font("Arial", Font.BOLD, 25));
                    // g.drawString(lines[0], 250, 230);
                    int width = g.getFontMetrics().stringWidth(line);
                    int offsetCal = yPos;
                    if(width > imagewidth-(xPos + 40)){
                        String []  addressArray = line.split(" ");
                        String []  addressNew = new String[0];
                        String seg = "", preLine= "",nline = "";
                        int count = lineCount;
                        for(int  i = 0;i< addressArray.length; i++){
                            seg = addressArray[i];
                            preLine = nline;
                            nline += seg + " ";
                            int widthnew = g.getFontMetrics().stringWidth(nline);
                            int widthpre = g.getFontMetrics().stringWidth(preLine);
                            if(widthnew > imagewidth-(xPos + 40)){
                                g.drawString(preLine, xPos, yPos);
                                count++;
                                preLine = "";
                                nline = seg + " ";
                                yPos = 220 + offset+ count * lineHeight;
                                // System.out.println("Offest:"+offset);
                            }
                            else{
                                continue;
                            }
                            
                        }
                        int widthpre = g.getFontMetrics().stringWidth(preLine);
                        g.drawString(nline, xPos, yPos);
                        yPos = 220 + offset+ count * lineHeight;
                    }
                    else{
                        g.drawString(line, xPos, yPos);
                    }
                    offset = offset + (yPos - offsetCal);
                    // System.out.println("Offest   2:"+offset);
                    continue;
                }
                
                if(lineCount == 1){
                    g.setFont(new Font("Arial", Font.ROMAN_BASELINE, 18));
                    int width = g.getFontMetrics().stringWidth(line);
                    int offsetCal = yPos;
                    if(width > imagewidth-(xPos + 40)){
                        String []  addressArray = line.split(" ");
                        String []  addressNew = new String[0];
                        String seg = "", preLine= "",nline = "";
                        int count = lineCount;
                        for(int  i = 0;i< addressArray.length; i++){
                            seg = addressArray[i];
                            preLine = nline;
                            nline += seg + " ";
                            int widthnew = g.getFontMetrics().stringWidth(nline);
                            int widthpre = g.getFontMetrics().stringWidth(preLine);
                            if(widthnew > imagewidth-(xPos + 40)){
                                g.drawString(preLine, xPos, yPos);
                                count++;
                                preLine = "";
                                nline = seg + " ";
                                yPos = 220 + offset+ count * lineHeight;
                                // System.out.println("union Offest:"+offset);
                            }
                            else{
                                continue;
                            }
                            
                        }
                        int widthpre = g.getFontMetrics().stringWidth(preLine);
                        g.drawString(nline, xPos, yPos);
                        yPos = 220 + offset+ count * lineHeight;
                    }
                    else{
                        g.drawString(line, xPos, yPos);
                    }
                    offset =offset + (yPos - offsetCal);
                    // System.out.println("union Offest2:"+offset);
                }
                else{
                    g.drawString(line, xPos, yPos);
                }
            }
                String str1 = ""+name+"~"+role+"~"+location+"~"+jdate+"";
                String uId = AddressIn;
                uId = uId.replace("###", "(").trim();
                uId = uId.replace("#@#", ")").trim();
                // System.out.print("Addreasasasasasas                        :"+uId);
                uId = uId.replace("_", " ").trim();
                g.setColor(Color.WHITE);
                g.setFont(new Font("Arial", Font.BOLD, 18));
                int width = g.getFontMetrics().stringWidth(uId);
                if(width > imagewidth-60){
                    String []  addressArray = uId.split(" ");
                    String []  addressNew = new String[0];
                    String seg = "", preLine= "",line = "";
                    int count = 0;
                    for(int  i = 0;i< addressArray.length; i++){
                        seg = addressArray[i];
                        preLine = line;
                        line += seg + " ";
                        int widthnew = g.getFontMetrics().stringWidth(line);
                        int widthpre = g.getFontMetrics().stringWidth(preLine);
                        if(widthnew > imagewidth-60){
                            // System.out.println((imagewidth - widthpre)/2);
                            g.drawString(preLine, (imagewidth -widthpre)/2, 455+(count * g.getFontMetrics().getHeight())-5);
                            count++;
                            preLine = "";
                            line = seg + " ";
                        }
                        else{
                            continue;
                        }
                        
                    }
                    int widthpre = g.getFontMetrics().stringWidth(line);
                    g.drawString(line, (imagewidth -widthpre)/2, 455+(count * g.getFontMetrics().getHeight())-5);
                }
                else{
                    g.drawString(uId, (imagewidth - width)/2, 455);
                }
            g.dispose();
            address = "/var/www/html/assets/img/profile/card/"+uid+"blank.png";
            ImageIO.write(bImage, "png", new File(address));
        } catch (IOException e) {
            System.out.println("Exception occured :" + e.getMessage());
        }
    return address;
}

    public static void imageRounder(String url) throws Exception{
        try{        
            File url3 = new File("/var/www/html/assets/img/images/profile.png");
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

            g2.setClip(new RoundRectangle2D.Double(0,0,width,height,280,280));

            // System.out.println(width+"\n"+height+"\n"+width/4+"\n"+height/4);
            
            // Now, draw the image. The image is now
            // in the 'clipped' shape, the shape in the setClip()
            g2.drawImage(originalImg,0,0,null);
            
            // Dispose it, we no longer need it.
            g2.dispose();
            
            // Write to a new image file
            ImageIO.write(bim,"PNG",new File("/var/www/html/assets/img/images/profilerounded.png"));
            }
        catch(Exception e){

        }
    }
    
}


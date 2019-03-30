
 
import javax.imageio.ImageIO;
import java.io.File;
import java.io.IOException;
import java.awt.image.BufferedImage;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.GraphicsEnvironment;
import java.awt.FontFormatException;
import java.lang.String;
 
 
public class imageopen {    
 
    public static void main( String[] args ){
      imageIoWrite();
    }
     
    public static void imageIoWrite() {
         BufferedImage bImage = null;
         try {
             File url = new File("C://Users/AshishKamal/Desktop/HELLOmywork_id_card_BLANK_GREEN-min.png");
             bImage = ImageIO.read(url);
             String name = "Ashish";
             String role = "Ad promoter";
             String location = "location: Thissur";
             String jdate = "join date: 17/03/2019";
             

            String str = "Ashish~Ad Promoter~location: Thissur~join date: 17/03/2019~issue date: 17/03/2019"; //some text with line breaks;
            String [] lines = str.split("~");
            Graphics g = bImage.getGraphics();
            g.setColor(Color.decode("#C0C0C0"));
            g.setFont(g.getFont().deriveFont(20f));
            int lineHeight = g.getFontMetrics().getHeight() +5;
            for(int lineCount = 0; lineCount < lines.length; lineCount ++){ //lines from above
                        g.setColor(Color.decode("#C0C0C0"));
            g.setFont(g.getFont().deriveFont(20f));
                int xPos = 250;
                int yPos = 250 + lineCount * lineHeight;
                String line = lines[lineCount];
                if(lineCount == 0){
                    g.setColor(Color.WHITE);
                    g.setFont(new Font("Arial", Font.BOLD, 25));
                    g.drawString(name, 250, 250);
                    continue;
                }
                g.drawString(line, xPos, yPos);
            }
            g.dispose();
 
             ImageIO.write(bImage, "png", new File("C://Users/AshishKamal/Desktop/"+lines[0]+".png"));
            //  ImageIO.write(bImage, "jpg", new File("C://Users/AshishKamal/Desktop/image.jpg"));
            //  ImageIO.write(bImage, "bmp", new File("C://Users/AshishKamal/Desktop/image.bmp"));

            
            byte[] btDataFile = new sun.misc.BASE64Decoder().decodeBuffer(youtData);
            File of = new File("yourFile.png");
            FileOutputStream osf = new FileOutputStream(of);
            osf.write(btDataFile);
            osf.flush();
 
         } catch (IOException e) {
               System.out.println("Exception occured :" + e.getMessage());
         }
        //  System.out.println("Images were written succesfully.");
    }
 
}
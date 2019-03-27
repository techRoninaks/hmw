import java.awt.AlphaComposite;
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
import java.awt.GraphicsEnvironment;
import java.awt.FontFormatException;
import java.lang.String;
import java.net.URL;
//from  ww  w .j a v a  2  s  .c  o  m
import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;
import java.awt.geom.*;

public class java {
  public static void main(String[] args) throws IOException {

    String add = imageIoWrite("C://Users/AshishKamal/Desktop/HELLOmywork_id_card_BLANK_GREEN-min.png");
    System.out.println(add);
    File pro = new File("C://Users/AshishKamal/Desktop/weston-boucher.jpg");
    File url = new File(add);
    BufferedImage im = ImageIO.read(url);
    URL url2 = new URL("http://www.java2s.com/style/download.png");
    BufferedImage im2 = ImageIO.read(pro);
    BufferedImage grayImg = ImageIO.read(pro);
    BufferedImage colorImage = new BufferedImage(grayImg .getWidth(), grayImg .getHeight(), BufferedImage.TYPE_BYTE_GRAY);
    Graphics2D graphics = colorImage.createGraphics();
    graphics.drawImage(grayImg ,0,0,null);

    // BufferedImage colorImage1 = new BufferedImage(im2, BufferedImage.TYPE_INT_ARGB);
    // Graphics2D graphics3 = colorImage1.createGraphics();
    // graphics3.drawImage(im2 ,0,0,null);
    // graphics.dispose();

    // grayImg.flush();
    // ImageIO.write(colorImage ,"png", new File("C://Users/AshishKamal/Desktop/gray.png"));
    // colorImage .flush();
    
    
    Graphics2D g = im.createGraphics();
    // AlphaComposite composite = AlphaComposite.getInstance(type, alpha);
    // g.setComposite(composite);
    // RenderingHints qualityHints = new RenderingHints(RenderingHints.KEY_ANTIALIASING,RenderingHints.VALUE_ANTIALIAS_ON);
    //     qualityHints.put(RenderingHints.KEY_RENDERING,RenderingHints.VALUE_RENDER_QUALITY);
    //     g.setRenderingHints(qualityHints);
    g.drawImage(im2, 60,230,150,150, null);
    g.drawImage(colorImage, 666,322,68,68, null);
    g.dispose();

    display(im);
    ImageIO.write(im, "png", new File("C://Users/AshishKamal/Desktop/output.png"));

  }

  public static void display(BufferedImage image) {
    JFrame f = new JFrame();
    f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    f.getContentPane().add(new JLabel(new ImageIcon(image)));
    f.pack();
    f.setVisible(true);
  }

  public static String imageIoWrite(String url3) {
         BufferedImage bImage = null;
         String address="";
         try {
             File url = new File(url3);
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
            address = "C://Users/AshishKamal/Desktop/"+lines[0]+".png";
             ImageIO.write(bImage, "png", new File(address));
         } catch (IOException e) {
               System.out.println("Exception occured :" + e.getMessage());
         }
        //  System.out.println("Images were written succesfully.");
        return address;
    }
}

import static org.junit.Assert.*;

import javax.ws.rs.core.Response;

import org.json.JSONException;
import org.json.JSONObject;
import org.junit.Test;

public class ftocTest {
	
	FtoCService fc = new FtoCService();
	Response re =fc.convertFtoCfromInput((float) 98.24);
	JSONObject obj = new JSONObject();

	@Test
	public void test() throws JSONException{
		float celsius=(float)36.8;
		float fahrenheit=(float)98.24;
		
		
		obj.put("C Value", celsius);
		obj.put("F Value", fahrenheit);
		String test =""+re.getEntity();
		System.out.println("Test values is:"+test+"which should be equal to actual "+obj.toString());
		assertEquals(test, obj.toString());
		//fail("Not yet implemented");
	}

}
